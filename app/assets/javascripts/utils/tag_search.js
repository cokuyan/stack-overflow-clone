(function() {
  "use strict";

  var TagSearch = StackOverflowClone.Widgets.TagSearch = function (options) {
    this.$el = $(options.selector);
    this.$input = this.$el.find('.search');
    this.$ul = this.$el.find('.question-tags');
    this.tags = options.tags;

    this.$input.on("input", this.render.bind(this));
    this.render();
  };

  TagSearch.prototype.searchResults = function () {
    return this.tags.search(this.$input.val());
  };

  TagSearch.prototype.render = function () {
    this.$ul.empty();
    var widget = this;

    this.searchResults().each(function (tag) {
      var $li = $("<li class='tag'>");
      $li.data("id", tag.id);
      $li.html(tag.escape("tag_name"));
      widget.$ul.append($li);
    });
  };
}());
