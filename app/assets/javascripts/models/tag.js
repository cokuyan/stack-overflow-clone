StackOverflowClone.Models.Tag = Backbone.Model.extend({
  urlRoot: 'api/tags',

  parse: function (resp) {
    if (resp.questions) {
      this.questions = new StackOverflowClone.Collections.Questions(
        resp.questions
      );
      delete resp.questions;
    }
    return resp;
  }
});
