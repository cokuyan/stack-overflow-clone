StackOverflowClone.Views.QuestionShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['questions/show'],

  render: function () {
    this.$el.html(this.template({ question: this.model }))
    return this;
  }
})
