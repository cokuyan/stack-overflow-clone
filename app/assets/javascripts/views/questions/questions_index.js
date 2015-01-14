StackOverflowClone.Views.QuestionsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.header = options.header;
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.comparator = this.collection.comparator ||
                                 options.comparator;
  },

  template: JST['questions/index'],
  questionTemplate: JST['shared/detailedQuestion'],

  events: {
    'click li.option': 'resortQuestions'
  },

  render: function () {
    this.$el.html(this.template({ questions: this.collection }));
    this.setHeader();
    this.attachQuestions();
    return this;
  },

  attachQuestions: function () {
    var view = this;
    this.collection.each(function (question) {
      view.$("ul.questions").append(view.questionTemplate({
        question: question
      }));
    });
  },

  setHeader: function () {
    if (!this.sortBy || this.sortBy === "created_at") {
      header = "Most Recent Questions";
    } else if (this.sortBy === "vote_count") {
      header = "Most Voted Questions";
    } else if (this.sortBy === "view_count") {
      header = "Most Viewed Questions";
    } else if (this.sortBy === "answers_count") {
      header = "Most Answered Questions";
    }
    this.$("h1.header").html(header);
  },

  resortQuestions: function (event) {
    var view = this;
    this.sortBy = $(event.currentTarget).data("sort");
    if (this.sortBy === "created_at") {
      this.collection.comparator = "created_at";
    } else {
      this.collection.comparator = function (model) {
        return -1 * model.get(view.sortBy);
      };
    }
    this.collection.page = 1;
    this.collection.fetch({
      data: { sort: this.sortBy },
      success: function () {
        view.collection.sort();
        Backbone.history.navigate("questions")
      }
    });
  }

});
