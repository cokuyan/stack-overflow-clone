StackOverflowClone.Views.QuestionShow = Backbone.CompositeView.extend({
  template: JST['questions/show'],

  initialize: function () {
    var view = this;
    this.listenTo(StackOverflowClone.currentUser, 'sync', this.render);

    // model listener
    this.listenTo(this.model, 'sync change', function () {
      view.render();
      view.checkIfAsker();
      view.checkFavorites();
    });

    // answers collection listener
    this.listenTo(this.model.answers(), 'sync remove', this.render);
    this.listenTo(this.model.answers(), 'add', function (model) {
      view.addAnswerSubview(model);
      view.model.answers().sort();
    });
    this.listenTo(this.model.answers(), 'sort', this.sortAnswerSubviews);

    // comments collection listener
    this.listenTo(this.model.comments(), 'sync', this.render);
    this.listenTo(this.model.comments(), 'add', function (model) {
      view.addCommentSubview(model);
      view.model.answers().sort();
    });
    this.listenTo(this.model.comments(), 'sort', this.sortCommentSubviews);

    // add subviews
    this.addAnswerSubviews();
    this.addCommentSubviews();
  },

  events: {
    // voting
    'click button.vote': 'processVote',
    // favoriting
    'click .favorite': 'favoriteQuestion',
    'click .unfavorite': 'unfavoriteQuestion',
    // edit question
    'click .question-info span.edit': 'displayQuestionEdit',
    'click .edit-question .submit': 'editQuestion',
    'click .edit-question .cancel': 'hideQuestionEdit',
    // deleting stuff
    'click .delete-question': 'deleteQuestion',
    'click .delete-answer': 'deleteAnswer',
    // answering
    'click a.new-answer-link': 'displayAnswerForm',
    'click .new-answer button.submit': 'createAnswer',
    'click .new-answer button.cancel': 'removeAnswerForm',
    'click button.accept': 'acceptAnswer',
    // commenting
    'click span.new-question-comment': 'displayCommentForm',
    'click .new-comment .submit': 'createComment',
    'click .new-comment .cancel': 'removeCommentForm'
  },

  deleteQuestion: function (event) {
    if (this.model.vote_count > 0 ) return;
    this.model.destroy();
    Backbone.history.navigate("", { trigger: true });
    alert("Question deleted successfully");
  },

  deleteAnswer: function (event) {
    var id = $(event.currentTarget).data("id");
    var answer = this.model.answers().get(id);
    if (answer.vote_count > 0) return;

    var subview = _.find(this.subviews('ul.answers'), function (subview) {
      if (subview.model === answer) return subview;
    });
    this.removeSubview('ul.answers', subview);
    answer.destroy();
    this.model.answers().remove(answer);

    // this.render();
    alert("Answer deleted successfully");
  },
  //
  // findAnswerSubview: function (answer) {
  //   this.subviews('ul.answers').forEach(function (subview) {
  //
  //   });
  // },

  favoriteQuestion: function (event) {
    var view = this;
    $.ajax({
      url: "/api/questions/" + this.model.id + "/favorite",
      type: "GET",
      success: function () {
        view.model.fetch();
        alert("Favorited successfully");
      },
      error: function (resp) {
        if (resp.responseText) {
          alert(resp.responseText);
        } else {
          alert(resp.responseJSON[0]);
        }
      }
    });
  },

  unfavoriteQuestion: function (event) {
    var view = this;
    $.ajax({
      url: "/api/questions/" + this.model.id + "/unfavorite",
      type: "DELETE",
      success: function () {
        view.model.fetch();
        alert("Unfavorited successfully");
      },
      error: function (resp) {
        if (resp.responseText) {
          alert(resp.responseText);
        } else {
          alert(resp.responseJSON[0]);
        }
      }
    });
  },

  checkFavorites: function () {
    if (this.model.get("favorited")) {
      this.$('.favorite').addClass("hidden");
      this.$('.unfavorite').removeClass("hidden");
    }
  },

  sortAnswerSubviews: function () {
    this.removeSubviews('ul.answers');
    this.addAnswerSubviews();
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

  sortCommentSubviews: function () {
    this.removeSubviews('ul.question-comments');
    this.addCommentSubviews();
  },

  addCommentSubviews: function () {
    var view = this;
    this.model.comments().each(function (comment) {
      view.addCommentSubview(comment);
    });
  },

  addCommentSubview: function (comment) {
    var subview = new StackOverflowClone.Views.CommentShow({ model: comment });
    this.addSubview('ul.question-comments', subview);
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

    this.$('form.new-answer').removeClass('hidden');
  },

  removeAnswerForm: function (event) {
    event.preventDefault();
    this.$('form.new-answer').addClass('hidden');

    this.$('a.new-answer-link').removeClass('hidden');
  },

  createAnswer: function (event) {
    event.preventDefault();

    var content = this.$('.new-answer textarea').val();
    var view = this;
    var answer = new StackOverflowClone.Models.Answer({
      content: content,
      question_id: this.model.id
    });
    answer.save({}, {
      success: function () {
        view.model.answers().add(answer);
        view.$('textarea').val('');
        view.removeAnswerForm(event);
      },
      error: function (model, resp) {
        alert(resp.responseText)
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
        // may not be necessary
        votable.set("vote_count", votableResp.vote_count);
      },
      error: function (resp) {
        if (resp.responseText) {
          alert(resp.responseText);
        } else {
          alert(resp.responseJSON[0]);
        }
      }
    })
  },

  checkIfAsker: function () {
    if (StackOverflowClone.currentUser &&
        this.model.author &&
        StackOverflowClone.currentUser.id === this.model.author.id) {
      this.$('a.new-answer-link').addClass('hidden');
      this.$('.question-info span.edit').removeClass('hidden');
      this.$('.delete-question').removeClass('hidden');

      if (!this.model.get('answered')) {
        this.$('button.accept').removeClass('hidden');
      }
    }
  },

  acceptAnswer: function (event) {
    event.preventDefault();

    var answer = this.model.answers().get($(event.currentTarget).data("id"))
    var view = this;

    answer.save({ accepted: true });
    this.model.save({ answered: true }, {
      success: function () {
        alert("Answer accepted successfully");
        view.$('button.accept').addClass('hidden');
        view.model.answers().sort();
      },
      error: function (resp) {
        alert(resp.responseJSON)
      }
    })
  },

  displayQuestionEdit: function (event) {
    this.$('p.question-content').addClass('hidden');
    this.$('form.edit-question').removeClass('hidden');
  },

  hideQuestionEdit: function (event) {
    event.preventDefault();
    this.$('form.edit-question').addClass('hidden');
    this.$('p.question-content').removeClass('hidden');
  },

  editQuestion: function (event) {
    event.preventDefault();
    var content = this.$('.edit-question textarea').val();
    this.model.save({ content: content }, {
      success: function () {
        alert("Edited successfully");
      },
      error: function () {
        alert("Something went wrong")
      }
    });
  },

  displayCommentForm: function (event) {
    $(event.currentTarget).addClass("hidden");
    this.$("form.new-comment").removeClass("hidden");
  },

  removeCommentForm: function (event) {
    event.preventDefault();
    this.$("form.new-comment").addClass("hidden");
    this.$(".new-question-comment").removeClass("hidden");
  },

  createComment: function (event) {
    event.preventDefault();

    var content = this.$('.new-comment textarea').val();
    var view = this;
    var comment = new StackOverflowClone.Models.Comment({
      content: content,
      commentable_id: this.model.id,
      commentable_type: "Question"
    });
    comment.save({}, {
      success: function () {
        view.model.comments().add(comment);
        view.$('textarea').val('');
        view.removeCommentForm(event);
      },
      error: function (model, resp) {
        alert(resp.responseText)
      }
    });
  }

})
