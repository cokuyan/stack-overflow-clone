StackOverflowClone.Views.AnswerShow = Backbone.CompositeView.extend({
  template: JST['answers/show'],
  tagName: 'li',
  className: 'answer',
  initialize: function () {
    this.listenTo(this.model, 'sync change', this.render);
  },

  events: {
    'click button.accept': 'acceptAnswer',
    'click span.edit': 'editAnswer'
  },

  render: function () {
    if (this.model.author) {
      this.$el.html(this.template({ answer: this.model }));
    }
    if (this.model.get("accepted")) {
      this.$('span.accept').removeClass("hidden")
    }
    if (this.model.author.id === StackOverflowClone.currentUser.id) {
      this.$('span.edit').removeClass("hidden");
    }
    return this;
  },

  editAnswer: function (event) {
    alert("stuff")
  }

});
