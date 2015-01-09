StackOverflowClone.Views.QuestionShow = Backbone.CompositeView.extend({
  template: JST['questions/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', function () {
      this.addAnswerSubviews();
      this.render();
    }.bind(this));
    // this.listenTo(this.model.answers(), 'sync', )
  },

  addAnswerSubviews: function () {
    var view = this;
    this.model.answers().each(function (answer) {
      var subview = new StackOverflowClone.Views.AnswerShow({ model: answer });
      view.addSubview('ul.answers', subview);
    });
  },

  render: function () {
    if (this.model.author) {
      this.$el.html(this.template({ question: this.model }))
      this.attachSubviews();
    }
    return this;
  }
})
