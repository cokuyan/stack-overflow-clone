StackOverflowClone.Models.Answer = Backbone.Model.extend({
  urlRoot: 'api/answers',

  toJSON: function () {
    return { answer: _.clone(this.attributes) };
  },

  parse: function (resp) {
    if (resp.author) {
      this.author = new StackOverflowClone.Models.User(resp.author);
      delete resp.author;
    }
    return resp;
  }
});
