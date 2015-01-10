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
      this.tags = new StackOverflowClone.Collections.Tags(resp.tags);
      delete resp.tags;
    }
    return resp;
  }
});
