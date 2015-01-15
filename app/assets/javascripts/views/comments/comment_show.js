StackOverflowClone.Views.CommentShow = Backbone.View.extend({
  template: JST['comments/show'],
  tagName: 'li',
  className: 'comment',
  initialize: function () {
    this.listenTo(this.model, 'sync change', this.render);
    this.listenTo(StackOverflowClone.currentUser, 'sync', this.render);
  },

  events: {
    'click span.edit': 'displayEditForm',
    'click .edit-comment .cancel': 'hideEditForm',
    'click .edit-comment .submit': 'editComment'
  },

  render: function () {
    if (this.model.author) {
      this.$el.html(this.template({ comment: this.model }));
    }
    if (StackOverflowClone.currentUser &&
        this.model.author.id === StackOverflowClone.currentUser.id) {
      this.$('span.edit').removeClass("hidden");
    }
    return this;
  },

  displayEditForm: function (event) {
    this.$('p.comment-content').addClass("hidden");
    this.$('form.edit-comment').removeClass("hidden");
  },

  hideEditForm: function (event) {
    this.preventDefault();
    this.$('form.edit-comment').addClass("hidden");
    this.$('p.comment-content').removeClass("hidden");
  },

  editComment: function (event) {
    event.preventDefault();
    var content = this.$('textarea').val();
    this.model.save({ content: content }, {
      success: function () {
        alert("Edited successfully");
      },
      error: function () {
        alert("Somethine went wrong");
      }
    });
  }

});
