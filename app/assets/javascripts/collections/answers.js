StackOverflowClone.Collections.Answers = Backbone.Collection.extend({
  url: 'api/answers',
  model: StackOverflowClone.Models.Answer,

  initialize: function (models, options) {
    if (options) {
      this.question = options.question;
    }
  }

});
