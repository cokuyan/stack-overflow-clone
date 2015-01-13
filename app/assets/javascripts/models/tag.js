StackOverflowClone.Models.Tag = Backbone.Model.extend({
  urlRoot: 'api/tags',

  toJSON: function () {
    return { tag: _.clone(this.attributes) };
  },

  questions: function () {
    if (!this._questions) {
      this._questions = new StackOverflowClone.Collections.Questions();
    }
    return this._questions;
  },

  parse: function (resp) {
    if (resp.questions) {
      this.questions().set(resp.questions, { parse: true });
      delete resp.questions;
    }
    return resp;
  }
});
