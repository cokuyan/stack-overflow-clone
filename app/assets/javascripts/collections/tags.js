StackOverflowClone.Collections.Tags = Backbone.Collection.extend({
  url: 'api/tags',
  model: StackOverflowClone.Models.Tag,

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
  }

});

StackOverflowClone.tags = new StackOverflowClone.Collections.Tags();
