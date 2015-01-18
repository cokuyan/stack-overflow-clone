StackOverflowClone.Collections.Answers = Backbone.Collection.extend({
  url: 'api/answers',
  model: StackOverflowClone.Models.Answer,

  comparator: function (answer1, answer2) {
    if (answer1.get("accepted")) {
      return -1;
    } else if (answer2.get("accepted")) {
      return 1;
    }
    if (answer1.get("vote_count") > answer2.get("vote_count")) {
      return -1;
    } else if (answer2.get("vote_count") > answer1.get("vote_count")) {
      return 1;
    }
    return 0;
  },

  initialize: function (models, options) {
    if (options) {
      this.question = options.question;
    }
  }

});
