StackOverflowClone.Views.AnswerShow = Backbone.CompositeView.extend({
  template: JST['answers/show'],
  tagName: 'li',
  className: 'answer',
  initialize: function () {
    this.listenTo(this.model, 'sync change', this.render);
  },

  events: {
    'click button.accept': 'acceptAnswer',
    'click span.edit': 'displayEditForm',
    'click button.submit': 'editAnswer',
    'click button.cancel': 'hideEditForm'
  },

  render: function () {
    if (this.model.author) {
      this.$el.html(this.template({ answer: this.model }));
    }
    if (this.model.get("accepted")) {
      this.$('span.accept').removeClass("hidden")
    }
    if (StackOverflowClone.currentUser &&
        this.model.author.id === StackOverflowClone.currentUser.id) {
      this.$('span.edit').removeClass("hidden");
    }
    return this;
  },

  displayEditForm: function (event) {
    this.$('p.answer-content').addClass("hidden");
    this.$('form.edit-answer').removeClass("hidden");
  },

  hideEditForm: function (event) {
    event.preventDefault();
    this.$('form.edit-answer').addClass("hidden");
    this.$('p.answer-content').removeClass("hidden");
  },

  editAnswer: function (event) {
    event.preventDefault();
    var content = this.$('textarea').val();
    this.model.save({ content: content }, {
      success: function () {
        alert("Edited successfully");
      },
      error: function () {
        alert("Something went wrong")
      }
    });
  }

});
