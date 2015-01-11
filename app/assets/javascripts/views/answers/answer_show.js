StackOverflowClone.Views.AnswerShow = Backbone.CompositeView.extend({
  template: JST['answers/show'],
  tagName: 'li',
  className: 'answer',
  initialize: function () {
    this.listenTo(this.model, 'sync change', this.render);
  },

  events: {
    'click button.accept': 'acceptAnswer'
  },

  render: function () {
    if (this.model.author) {
      this.$el.html(this.template({ answer: this.model }));
    }
    return this;
  }

});
