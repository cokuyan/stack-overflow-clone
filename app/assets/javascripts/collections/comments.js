StackOverflowClone.Collections.Comments = Backbone.Collection.extend({
  url: 'api/comments',
  model: StackOverflowClone.Models.Comment,
  comparator: function (model) {
    return model.created_at;
  },

  getOrFetch: function (id) {
    var comment = this.get(id);
    var comments = this;

    if (!comment) {
      comment = new StackOverflowClone.Models.Comment({ id: id });
      comment.fetch({
        success: function () {
          comments.add(comment)
        }
      });
    } else {
      comment.fetch();
    }
    return comment;
  }

});
