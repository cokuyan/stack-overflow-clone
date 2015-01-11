StackOverflowClone.Views.TagShow = Backbone.View.extend({
  template: JST['tags/show'],
  questionTemplate: JST['shared/question'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    // fill in with something...
    this.$el.html(this.template({ tag: this.model }));
    this.addQuestions();
    return this;
  },

  addQuestions: function () {
    this.model.questions().each(function (question) {
      this.$("ul.tag-questions").append(this.questionTemplate({
        question: question
      }));
    }.bind(this));
  }
});
