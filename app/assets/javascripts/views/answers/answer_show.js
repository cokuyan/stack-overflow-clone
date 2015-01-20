StackOverflowClone.Views.AnswerShow = Backbone.CompositeView.extend({
  template: JST['answers/show'],
  tagName: 'li',
  className: 'answer group',
  initialize: function () {
    this.listenTo(this.model, 'sync change', this.render);
    this.listenTo(StackOverflowClone.currentUser, 'sync', this.render);

    // comments collection listener
    this.listenTo(this.model.comments(), 'sync', this.render);
    this.listenTo(this.model.comments(), 'add', this.addCommentSubview.bind(this));

    this.addCommentSubviews();
  },

  events: {
    'click .answer-meta span.edit': 'displayEditForm',
    'click .edit-answer button.submit': 'editAnswer',
    'click .edit-answer button.cancel': 'hideEditForm',
    'click span.new-answer-comment': 'displayCommentForm',
    'click .new-answer-comment .submit': 'createComment',
    'click .new-answer-comment .cancel': 'removeCommentForm'
  },

  addCommentSubviews: function () {
    var view = this;
    this.model.comments().each(function (comment) {
      view.addCommentSubview(comment);
    });
  },

  addCommentSubview: function (comment) {
    var subview = new StackOverflowClone.Views.CommentShow({ model: comment });
    this.addSubview('ul.answer-comments', subview);
  },

  render: function () {
    if (this.model.author) {
      this.$el.html(this.template({ answer: this.model }));
      this.attachSubviews();
    }
    if (this.model.get("accepted")) {
      this.$('span.accept').removeClass("hidden");
    }
    if (StackOverflowClone.currentUser &&
        this.model.author.id === StackOverflowClone.currentUser.id) {
      this.$('.answer-meta span.edit').removeClass("hidden");
      this.$('span.delete-answer').removeClass('hidden');
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
    var content = this.$('.edit-answer textarea').val();
    this.model.save({ content: content }, {
      success: function () {
        alert("Edited successfully");
      },
      error: function () {
        alert("Something went wrong")
      }
    });
  },

  displayCommentForm: function (event) {
    $(event.currentTarget).addClass("hidden");
    this.$("form.new-answer-comment").removeClass("hidden");
  },

  removeCommentForm: function (event) {
    event.preventDefault();
    this.$("form.new-answer-comment").addClass("hidden");
    this.$("span.new-answer-comment").removeClass("hidden");
  },

  createComment: function (event) {
    event.preventDefault();

    var content = this.$('.new-answer-comment textarea').val();
    var view = this;
    var comment = new StackOverflowClone.Models.Comment({
      content: content,
      commentable_id: this.model.id,
      commentable_type: "Answer"
    });
    comment.save({}, {
      success: function () {
        view.model.comments().add(comment);
        view.$('textarea').val('');
        view.removeCommentForm(event);
      },
      error: function (model, resp) {
        alert(resp.responseText)
      }
    });
  }

});
