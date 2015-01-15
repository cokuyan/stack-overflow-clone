StackOverflowClone.Views.QuestionsIndex = Backbone.View.extend({
  initialize: function (options) {
    var view = this;
    this.header = options.header;
    this.listenTo(this.collection, 'sync', function () {
      view.render();
      view.setupPagination();
    });
    this.collection.comparator = this.collection.comparator ||
                                 options.comparator;
  },

  template: JST['questions/index'],
  questionTemplate: JST['shared/detailedQuestion'],

  events: {
    'click li.option': 'resortQuestions',
    'click .pagination': 'handlePagination'
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
    var header;
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
        view.paginator = null;
        Backbone.history.navigate("questions");
      }
    });
  },

  setupPagination: function () {
    if (!this.collection.total_pages) return;

    this.paginator = new StackOverflowClone.Widgets.Pagination({
      selector: 'section.pagination',
      totalPages: this.collection.total_pages,
      currentPage: this.collection.page || 1
    });
  },

  handlePagination: function (event) {
    var $target = $(event.target);
    var view = this;

    if ($target.hasClass("pagination") ||
        $target.data('page') === this.collection.page) {
      return;
    }
    if ($target.data("page")) {
      this.paginator.goToPage($target.data("page"));
    } else if ($target.hasClass("first")) {
      this.paginator.goToFirstPage();
    } else if ($target.hasClass("prev")) {
      this.paginator.goToPrevPage();
    } else if ($target.hasClass("next")) {
      this.paginator.goToNextPage();
    } else if ($target.hasClass("last")) {
      this.paginator.goToLastPage();
    }
    Backbone.history.navigate("questions/page/" + this.paginator.currentPage)
    this.collection.page = this.paginator.currentPage
    this.paginator = null;
    this.collection.fetch({
      data: { sort: this.sortBy }
    });
  }

});
