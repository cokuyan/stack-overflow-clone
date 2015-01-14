StackOverflowClone.Collections.Questions = Backbone.Collection.extend({
  url: function () {
    return 'api/questions/page/' + (this.page || 1);
  },
  model: StackOverflowClone.Models.Question,
  comparator: function (model) {
    return -1 * model.get("vote_count");
  },

  initialize: function (models, options) {
    if (options) {
      this.author = options.author;
    }
  },

  getOrFetch: function (id) {
    var question = this.get(id);
    var questions = this;
    if (!question) {
      question = new StackOverflowClone.Models.Question({ id: id });
      question.fetch({
        success: function () {
          questions.add(question);
        }
      });
    } else {
      question.fetch();
    }
    return question;
  }

});

// may need to do this differently
StackOverflowClone.questions = new StackOverflowClone.Collections.Questions();
