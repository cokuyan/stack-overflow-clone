StackOverflowClone.Models.Question = Backbone.Model.extend({
  urlRoot: 'api/questions',

  toJSON: function () {
    return { question: _.clone(this.attributes) };
  },

  answers: function () {
    if (!this._answers) {
      this._answers = new StackOverflowClone.Collections.Answers([], {
        question: this
      });
    }
    return this._answers;
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new StackOverflowClone.Collections.Comments();
    }
    return this._comments;
  },

  tags: function () {
    if (!this._tags) {
      this._tags = new StackOverflowClone.Collections.Tags();
    }
    return this._tags;
  },

  parse: function (resp) {
    if (resp.author) {
      this.author = new StackOverflowClone.Models.User(resp.author);
      delete resp.author;
    }
    if (resp.answers) {
      this.answers().set(resp.answers, { parse: true })
      delete resp.answers;
    }
    if (resp.tags) {
      this.tags().set(resp.tags, { parse: true })
      delete resp.tags;
    }
    if (resp.comments) {
      this.comments().set(resp.comments, { parse: true })
      delete resp.comments;
    }
    if (resp.created_at) {
      this.created_at = new Date(resp.created_at);
      delete resp.created_at;
    }
    return resp;
  }
});
