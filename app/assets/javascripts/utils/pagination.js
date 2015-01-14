(function() {
  "use strict";

  var Pagination = StackOverflowClone.Widgets.Pagination = function (options) {
    this.$el = $(options.selector);
    this.totalPages = options.totalPages;
    this.currentPage = options.currentPage || 1;
    this.setup();
    this.render();
  };

  Pagination.prototype.setup = function () {
    this.$first = $("<span class='first'>").html("first").appendTo(this.$el);
    this.$prev = $("<span class='prev'>").html("prev").appendTo(this.$el);
    this.$ul = $("<ul class='pages'>").appendTo(this.$el);
    this.$next = $("<span class='next'>").html("next").appendTo(this.$el);
    this.$last = $("<span class='last'>").html("last").appendTo(this.$el);
  };

  Pagination.prototype.render = function () {
    this.setupUl();
  };

  Pagination.prototype.setupUl = function () {
    this.$ul.empty();

    var startPage = (this.currentPage < 3) ? 1 : this.currentPage - 2;
    var endPage = (this.currentPage > this.totalPages - 2) ?
                    this.totalPages : this.currentPage + 2;

    for (var i = startPage; i <= endPage; i++) {
      var $li = $("<li class='page'>").data("page", i).html(i);
      this.$ul.append($li);
    }
  };

  Pagination.prototype.goToPage = function (page) {
    this.currentPage = page;
    this.render();
  };

  Pagination.prototype.goToNextPage = function () {
    this.currentPage += 1;
    this.render();
  };

  Pagination.prototype.gotoPrevPage = function () {
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
