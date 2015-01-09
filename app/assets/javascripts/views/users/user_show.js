StackOverflowClone.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    if (this.model.questions) {
      this.$el.html(this.template({ user: this.model }));
    }
    return this;
  }
});
