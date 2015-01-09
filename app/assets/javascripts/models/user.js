StackOverflowClone.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  questions: function () {
    if (!this._questions) {
      this._questions = new StackOverflowClone.Collections.Questions([], {
        author: this
      });
    }
    return this._questions
  },

  answeredQuestions: function () {
    if (!this._answeredQuestions) {
      this._answeredQuestions = new StackOverflowClone.Collections.Answers([], {
        author: this
      });
    }
    return this._answeredQuestions;
  },

  parse: function (resp) {
    if (resp.questions) {
      this.questions().set(resp.questions, { parse: true });
      delete resp.questions;
    }
    if (resp.answered_questions) {
      this.answeredQuestions().set(resp.answered_questions, { parse: true });
      delete resp.answered_questions;
    }
    return resp;
  }

});
