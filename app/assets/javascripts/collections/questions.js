StackOverflowClone.Collections.Questions = Backbone.Collection.extend({
  url: function () {
    return 'api/questions/page/' + (this.page || 1);
  },
  model: StackOverflowClone.Models.Question,

  initialize: function (models, options) {
    if (options) {
      this.author = options.author;
      this.page = options.page || 1;
    }
  },

  parse: function (resp) {
    if (resp.page) {
      this.page = resp.page;
      this.total_pages = resp.total_pages;
      return resp.questions;
    } else {
      return resp;
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
    }
    return question;
  }

});

StackOverflowClone.questions = new StackOverflowClone.Collections.Questions();
StackOverflowClone.questions.fetch();
