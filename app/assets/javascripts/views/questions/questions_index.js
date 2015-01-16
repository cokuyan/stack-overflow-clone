StackOverflowClone.Views.QuestionsIndex = Backbone.View.extend({
  initialize: function (options) {
    var view = this;
    this.sortBy = options.sortBy;
    this.unanswered = options.unanswered;
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
    if (this.sortBy) {
      this.$("li.option").removeClass("inactive");
      this.$("li[data-sort='" + this.sortBy +"']").addClass("inactive");
    }
    return this;
  },

  attachQuestions: function () {
    var view = this;
    this.collection.each(function (question) {
      view.$("ul.questions").append(view.questionTemplate({
        question: question
      }));
      if (question.get("answered")) {
        view.$("li[data-id='"+ question.id +"']").find('ul.question-data').addClass("answered");
      }

    });
  },

  setHeader: function () {
    var header;
    if (this.unanswered) {
      header = "Unanswered Questions";
    } else {
      header = "All Questions";
    }
    this.$("h1.header").html(header);
  },

  resortQuestions: function (event) {
    var view = this;
    if (this.sortBy === $(event.currentTarget).data("sort")) return;

    this.sortBy = $(event.currentTarget).data("sort");
    if (this.sortBy === "created_at") {
      this.collection.comparator = "created_at";
    } else {
      this.collection.comparator = function (model) {
        return -1 * model.get(view.sortBy);
      };
    }
    var url;
    if (this.unanswered) {
      url = "questions/unanswered"
    } else {
      url = "questions"
    }
    this.collection.page = 1;
    this.collection.fetch({
      data: { sort: this.sortBy },
      success: function () {
        view.collection.sort();
        view.paginator = null;
        Backbone.history.navigate(url);
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

    var url;
    if (this.unanswered) {
      url = "questions/unanswered"
    } else {
      url = "questions"
    }

    Backbone.history.navigate(url + "/page/" + this.paginator.currentPage)
    this.collection.page = this.paginator.currentPage
    this.paginator = null;
    this.collection.fetch({
      data: { sort: this.sortBy }
    });
  }

});
