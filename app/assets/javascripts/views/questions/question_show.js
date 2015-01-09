StackOverflowClone.Views.QuestionShow = Backbone.CompositeView.extend({
  template: JST['questions/show'],

  initialize: function () {
    var view = this;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.answers(), 'sync', this.render);
    this.listenTo(this.model.answers(), 'add', function (model) {
      view.addAnswerSubview(model);
    });

    this.addAnswerSubviews();
  },

  events: {
    'click a.new-answer-link': 'displayAnswerForm',
    'click button.submit': 'createAnswer',
    'click button.cancel': 'removeAnswerForm'
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
  }
})
