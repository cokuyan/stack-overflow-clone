StackOverflowClone.Views.UsersIndex = Backbone.View.extend({
  template: JST['users/index'],

  initialize: function (options) {
    var view = this;
    this.sortBy = options.sortBy;
    this.listenTo(this.collection, 'sync', function () {
      view.render();
      view.setupPagination();
    });
    this.collection.comparator = "username";
  },

  events: {
    'click li.option': 'resortUsers',
    'click .pagination': 'handlePagination'
  },

  render: function () {
    this.$el.html(this.template({ users: this.collection }));
    this.setHeader();
    if (this.sortBy) {
      this.$("li.option").removeClass("inactive");
      this.$("li[data-sort='" + this.sortBy +"']").addClass("inactive");
    }
    return this;
  },

  setHeader: function () {
    var header;
    if (!this.sortBy || this.sortBy === "username") {
      header = "All Users";
    } else if (this.sortBy === "questions_count") {
      header = "Asked Most Questions";
    } else if (this.sortBy === "answers_count") {
      header = "Answered Most Questions";
    } else if (this.sortBy === "created_at") {
      header = "New Users";
    }
    this.$("h1.header").html(header);
  },

  resortUsers: function (event) {
    var view = this;
    this.sortBy = $(event.currentTarget).data("sort");
    if (this.sortBy === "created_at") {
      this.collection.comparator = "created_at";
    } else if (this.sortBy === "username") {
      this.collection.comparator = "username"
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
        Backbone.history.navigate("users");
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
    Backbone.history.navigate("users/page/" + this.paginator.currentPage)
    this.collection.page = this.paginator.currentPage
    this.paginator = null;
    this.collection.fetch({
      data: { sort: this.sortBy }
    });
  }

});
