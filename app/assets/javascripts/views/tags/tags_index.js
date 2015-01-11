StackOverflowClone.Views.TagsIndex = Backbone.View.extend({
  template: JST['tags/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render)
  },

  render: function () {
    this.$el.html(this.template({ tags: this.collection }));
    return this;
  }

});
