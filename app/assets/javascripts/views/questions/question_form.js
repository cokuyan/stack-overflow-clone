StackOverflowClone.Views.QuestionForm = Backbone.View.extend({
  template: JST['questions/form'],
  tagName: 'form',
  className: 'question-form form',

  initialize: function () {
    this.setupDynamicSearch();
  },

  events: {
    'click button.submit': 'submitForm',
    'click .searchables li': 'addTag',
    'click li.tag span': 'removeTag',
    'input .input textarea': 'markdown'
  },

  markdown: function (event) {
    var text = $(event.currentTarget).val();
    var $p = $("p.markdown-preview");
    $p.html(markdown.toHTML(text));
  },

  setupDynamicSearch: function () {
    var view = this;
    var tags = new StackOverflowClone.Collections.Tags();
    tags.fetch({
      success: function () {
        // setup widget after collection is fetched
        view.dynamicSearch = new StackOverflowClone.Widgets.DynamicSearch({
          selector: view.$('.tag-widget'),
          collection: tags,
          name: "tag_name"
        });
        // setup listener
        view.listenTo(view.dynamicSearch.collection, 'add', function () {
          view.dynamicSearch.render();
        })
      }
    });
  },

  render: function () {
    this.$el.html(this.template({
      question: this.model,
      tags: this.collection
    }));
    return this;
  },

  addTag: function (event) {
    var tag = this.collection.getOrFetch($(event.currentTarget).data("id"));
    var $li = $(event.currentTarget);

    $li.remove();
    $li.removeClass("searchable").addClass("tag");
    $("ul.selected-tags").append($li);
    $li.data("id", tag.id);
    $li.append($("<span>&times;</span>"));

    this.dynamicSearch.collection.remove(tag);
  },

  removeTag: function (event) {
    var $li = $(event.currentTarget).parent()
    $(event.currentTarget).remove();
    var tag = new StackOverflowClone.Models.Tag({ id: $li.data("id") });
    var tags = this.dynamicSearch.collection;

    tag.fetch({
      success: function () {
        tags.add(tag);
      }
    });

    $li.remove();
  },

  submitForm: function (event) {
    event.preventDefault();
    var formData = this.$el.serializeJSON().question;
    // add tag_ids to formData object
    formData.tag_ids = this.getTagIds();
    var view = this;
    this.model.save(formData, {
      success: function () {
        StackOverflowClone.questions.add(view.model);
        Backbone.history.navigate('#/questions/' + view.model.id, {
          trigger: true
        });
      }
    });
  },

  getTagIds: function () {
    var ids = [];
    $(".selected-tags li.tag").each(function (index, tag) {
      ids.push($(tag).data("id"));
    });
    return ids;
  }
})
