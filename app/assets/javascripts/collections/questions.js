StackOverflowClone.Collections.Questions = Backbone.Collection.extend({
  url: 'api/questions',
  model: StackOverflowClone.Models.Question,
  comparator: 'created_at',

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
