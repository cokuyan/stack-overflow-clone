StackOverflowClone.Views.CommentShow = Backbone.View.extend({
  template: JST['comments/show'],
  tagName: 'li',
  className: 'comment',
  initialize: function () {
    this.listenTo(this.model, 'sync change', this.render);
  },

  events: {
    // some edit events
  },

  render: function () {
    if (this.model.author) {
      this.$el.html(this.template({ comment: this.model }));
    }
    return this;
  }


});
