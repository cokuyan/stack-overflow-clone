StackOverflowClone.Views.QuestionsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.header = options.header;
    this.listenTo(this.collection, 'sync add', this.render);
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
    this.$("h1.header").html(this.header || "Most Recent Questions")
  },

  resortQuestions: function (event) {
    sortBy = $(event.currentTarget).html();
    if (sortBy === "Newest") {
      this.collection.comparator = "created_at";
      this.header = "Most Recent Questions";
    } else if (sortBy === "Votes") {
      this.collection.comparator = function (model) {
        return -1 * model.get("vote_count");
      };
      this.header = "Most Voted Questions";
    } else if (sortBy === "Views") {
      this.collection.comparator = function (model) {
        return -1 * model.get("view_count");
      }
      this.header = "Most Viewed Questions";
    } else if (sortBy === "Answers") {
      this.collection.comparator = function (model) {
        return -1 * model.get("answers_count");
      }
      this.header = "Most Answered Questions";
    }
    this.collection.sort();
    this.render();
  }

});
