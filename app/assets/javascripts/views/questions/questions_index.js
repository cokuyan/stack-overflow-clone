StackOverflowClone.Views.QuestionsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.collection, 'sync add', this.render);
    this.collection.comparator = this.collection.comparator ||
                                 options.comparator;
  },

  template: JST['questions/index'],

  render: function () {
    this.$el.html(this.template({ questions: this.collection }));
    return this;
  }

});
