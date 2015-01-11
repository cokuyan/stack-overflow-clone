StackOverflowClone.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  questionTemplate: JST['shared/question'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    if (this.model.questions) {
      this.$el.html(this.template({ user: this.model }));
      this.attachQuestions();
    }
    return this;
  },

  attachQuestions: function () {
    this.attachQuestion(
      this.model.questions(),
      'ul.user-questions'
    );
    this.attachQuestion(
      this.model.answeredQuestions(),
      'ul.user-answered-questions'
    );
  },

  attachQuestion: function (questions, selector) {
    questions.each(function (question) {
      this.$(selector).append(this.questionTemplate({
        question: question
      }));
    }.bind(this));
  }
});
