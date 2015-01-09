StackOverflowClone.Views.QuestionShow = Backbone.CompositeView.extend({
  template: JST['questions/show'],

  initialize: function () {
    var view = this;
    this.listenTo(this.model, 'sync change', function () {
      view.render();
      view.checkIfAsker();
    });
    this.listenTo(this.model.answers(), 'sync', this.render);
    this.listenTo(this.model.answers(), 'add', function (model) {
      view.addAnswerSubview(model);
    });

    this.addAnswerSubviews();
  },

  events: {
    'click a.new-answer-link': 'displayAnswerForm',
    'click button.submit': 'createAnswer',
    'click button.cancel': 'removeAnswerForm',
    'click button.vote': 'processVote',
    'click button.accept': 'acceptAnswer'
  },

  addAnswerSubviews: function () {
    var view = this;
    this.model.answers().each(function (answer) {
      view.addAnswerSubview(answer);
    });
  },

  addAnswerSubview: function (answer) {
    var subview = new StackOverflowClone.Views.AnswerShow({ model: answer });
    this.addSubview('ul.answers', subview);
  },

  render: function () {
    if (this.model.author) {
      this.$el.html(this.template({ question: this.model }))
      this.attachSubviews();
    }
    return this;
  },

  displayAnswerForm: function (event) {
    event.preventDefault();
    $(event.currentTarget).addClass('hidden');

    this.$('form.new-answer-form').removeClass('hidden');
  },

  removeAnswerForm: function (event) {
    event.preventDefault();
    this.$('form.new-answer-form').addClass('hidden');

    this.$('a.new-answer-link').removeClass('hidden');
  },

  createAnswer: function (event) {
    event.preventDefault();
    var content = this.$('textarea').val();
    var view = this;

    var answer = new StackOverflowClone.Models.Answer({
      content: content,
      question_id: this.model.id
    });
    answer.save({}, {
      success: function () {
        view.model.answers().add(answer);
        view.$('textarea').val('');
        // might need to change this later
        view.removeAnswerForm(event);
      },
      error: function () {
        alert("Something went wrong")
      }
    });
  },

  processVote: function (event) {
    event.preventDefault();
    var view = this;
    var votable_id, votable_type, vote_type, $button, votable;
    $button = $(event.currentTarget);
    votable_id = $button.data('votable-id');
    votable_type = $button.data('votable-type');
    vote_type = $button.html();

    if (votable_type === "Question") {
      votable = this.model;
    } else {
      votable = this.model.answers().get(votable_id);
    }

    $.ajax({
      url: "/api/votes",
      type: "POST",
      data: {
        vote: {
          votable_id: votable_id,
          votable_type: votable_type,
          vote_type: vote_type
        }
      },
      success: function (votableResp) {
        alert("Voted successfully");
        votable.set("vote_count", votableResp.vote_count);
      },
      error: function (a, b, c) {
        alert(a.responseJSON);
      }
    })
  },

  checkIfAsker: function () {
    if (StackOverflowClone.currentUser &&
        this.model.author &&
        StackOverflowClone.currentUser.id === this.model.author.id &&
        !this.model.get('answered')) {
      this.$('button.accept').removeClass('hidden');
    }
  },

  acceptAnswer: function (event) {
    event.preventDefault();

    var answer = this.model.answers().get($(event.currentTarget).data("id"))

    answer.save({ answered: true });
    this.model.save({ answered: true }, {
      success: function () {
        alert("Answer accepted successfully");
        this.$('button.accept').addClass('hidden')
      },
      error: function (resp) {
        alert(resp.responseJSON)
      }
    })
  }

})
