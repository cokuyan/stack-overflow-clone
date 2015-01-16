StackOverflowClone.Views.TagsIndex = Backbone.View.extend({
  template: JST['tags/index'],

  initialize: function () {
    var view = this;
    this.listenTo(this.collection, 'sync', function () {
      view.render();
      view.setupPagination();
    });
    this.collection.comparator = "tag_name";
  },

  events: {
    'click li.option': 'resortTags',
    'click .pagination': 'handlePagination'
  },

  render: function () {
    this.$el.html(this.template({ tags: this.collection }));
    this.setHeader();
    return this;
  },

  setHeader: function () {
    var header;
    if (!this.sortBy || this.sortBy === "tag_name") {
      header = "All Tags";
    } else if (this.sortBy === "questions_count") {
      header = "Most Questions";
    }
    this.$("h1.header").html(header);
  },

  resortTags: function (event) {
    var view = this;
    this.sortBy = $(event.currentTarget).data("sort");
    if (this.sortBy === "tag_name") {
      this.collection.comparator = "tag_name"
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
        Backbone.history.navigate("tags");
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
      Backbone.history.navigate("tags/page/" + this.paginator.currentPage)
      this.collection.page = this.paginator.currentPage
      this.paginator = null;
      this.collection.fetch({
        data: { sort: this.sortBy }
      });
    }

});
