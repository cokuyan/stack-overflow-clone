StackOverflowClone.Models.Question = Backbone.Model.extend({
  urlRoot: 'api/questions',

  answers: function () {
    if (!this._answers) {
      this._answers = new StackOverflowClone.Collections.Answers([], {
        question: this
      });
    }
    return this._answers;
  },

  tags: function () {
    if (!this._tags) {
      this._tags = new StackOverflowClone.Collections.Tags();
    }
    return this._tags
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
    return resp;
  }
});
