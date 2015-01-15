StackOverflowClone.Collections.Tags = Backbone.Collection.extend({
  url: function () {
    return 'api/tags/page/' + (this.page || 1);
  },
  model: StackOverflowClone.Models.Tag,

  initialize: function (models, options) {
    if (options) {
      this.page = options.page || 1
    }
  },

  parse: function (resp) {
    if (resp.page) {
      this.page = resp.page;
      this.total_pages = resp.total_pages;
      return resp.tags;
    } else {
      return resp;
    }
  },

  getOrFetch: function (id) {
    var tag = this.get(id);
    var tags = this;
    if (!tag) {
      tag = new StackOverflowClone.Models.Tag({ id: id });
      tag.fetch({
        success: function () {
          tags.add(tag);
        }
      });
    } else {
      tag.fetch();
    }
    return tag;
  },

  search: function (query) {
    query = query.toLowerCase();

    var searchTags = new StackOverflowClone.Collections.Tags();
    this.each(function (tag) {
      if (tag.get('tag_name').match(query)) {
        searchTags.add(tag);
      }
    })
    return searchTags;
  }

});

StackOverflowClone.tags = new StackOverflowClone.Collections.Tags();
StackOverflowClone.tags.fetch();
