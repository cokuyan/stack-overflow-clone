StackOverflowClone.Models.Answer = Backbone.Model.extend({
  urlRoot: 'api/answers',

  toJSON: function () {
    return { answer: _.clone(this.attributes) };
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new StackOverflowClone.Collections.Comments();
    }
    return this._comments;
  },

  parse: function (resp) {
    if (resp.author) {
      this.author = new StackOverflowClone.Models.User(resp.author);
      delete resp.author;
    }
    if (resp.comments) {
      this.comments().set(resp.comments, { parse: true })
      delete resp.comments;
    }
    return resp;
  }
});
