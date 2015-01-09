StackOverflowClone.Views.AnswerShow = Backbone.CompositeView.extend({
  template: JST['answers/show'],
  tagName: 'li',
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },

  render: function () {
    if (this.model.author) {
      this.$el.html(this.template({ answer: this.model }));
    }
    return this;
  }

});
