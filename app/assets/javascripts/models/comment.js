StackOverflowClone.Models.Comment = Backbone.Model.extend({
  urlRoot: 'api/comments',

  toJSON: function () {
    return { comment: _.clone(this.attributes) };
  },

  parse: function (resp) {
    if (resp.author) {
      this.author = new StackOverflowClone.Models.User(resp.author);
      delete resp.author;
    }
    return resp;
  }
});
