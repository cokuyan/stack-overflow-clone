(function() {
  "use strict";

  var DynamicSearch = StackOverflowClone.Widgets.DynamicSearch = function (options) {
    this.$el = $(options.selector);
    this.$input = this.$el.find('.search');
    this.$ul = this.$el.find('.searchables');
    this.collection = options.collection;
    this.name = options.name;

    this.$input.on("input", this.render.bind(this));
    this.render();
  };

  DynamicSearch.prototype.searchResults = function () {
    return this.collection.search(this.$input.val());
  };

  DynamicSearch.prototype.render = function () {
    this.$ul.empty();
    var widget = this;

    this.searchResults().each(function (model) {
      var $li = $("<li class='searchable'>");
      $li.data("id", model.id);
      $li.html(model.escape(widget.name));
      widget.$ul.append($li);
    });
  };
}());
