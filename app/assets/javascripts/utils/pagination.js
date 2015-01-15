(function() {
  "use strict";

  var Pagination = StackOverflowClone.Widgets.Pagination = function (options) {
    this.$el = $(options.selector);
    this.totalPages = options.totalPages;
    this.currentPage = options.currentPage || 1;
    this.render();
  };

  Pagination.prototype.setup = function () {
    if (this.currentPage !== 1) {
      this.$first = $("<span class='first'>").html("first").appendTo(this.$el);
      this.$prev = $("<span class='prev'>").html("prev").appendTo(this.$el);
    }
    this.$ul = $("<ul class='pages'>").appendTo(this.$el);
    if (this.currentPage !== this.totalPages) {
      this.$next = $("<span class='next'>").html("next").appendTo(this.$el);
      this.$last = $("<span class='last'>").html("last").appendTo(this.$el);
    }
  };

  Pagination.prototype.render = function () {
    this.$el.empty();
    this.setup();
    this.setupUl();
  };

  Pagination.prototype.setupUl = function () {
    this.$ul.empty();
    var endPage;
    var startPage = (this.currentPage < 3) ? 1 : this.currentPage - 2;
    if (this.currentPage > (this.totalPages - 2)) {
      endPage = this.totalPages;
    } else {
      endPage = this.currentPage + 2;
    }

    for (var i = startPage; i <= endPage; i++) {
      var $li = $("<li class='page'>").data("page", i).html(i);
      this.$ul.append($li);
    }
  };

  Pagination.prototype.goToPage = function (page) {
    if (this.currentPage === page) return;
    this.currentPage = page;
    this.render();
  };

  Pagination.prototype.goToNextPage = function () {
    if (this.currentPage === this.totalPages) return;
    this.currentPage += 1;
    this.render();
  };

  Pagination.prototype.goToPrevPage = function () {
    if (this.currentPage === 1) return;
    this.currentPage -= 1;
    this.render();
  };

  Pagination.prototype.goToFirstPage = function () {
    this.currentPage = 1;
    this.render();
  };

  Pagination.prototype.goToLastPage = function () {
    this.currentPage = this.totalPages;
    this.render();
  };

}());
