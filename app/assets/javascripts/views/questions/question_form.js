StackOverflowClone.Views.QuestionForm = Backbone.View.extend({
  template: JST['questions/form'],
  tagName: 'form',
  className: 'question-form form',

  initialize: function () {
    var view = this;
    this.setupTagSearch();
    // this.listenTo(this.tagSearch.tags, 'add', function () {
    //   // view.tagSearch.render();
    // })
  },

  events: {
    'click button.submit': 'submitForm',
    'click .question-tags li.tag': 'addTag',
    'click .selected-tags li.tag span': 'removeTag'
  },

  setupTagSearch: function () {
    var view = this;
    var tags = new StackOverflowClone.Collections.Tags();
    tags.fetch({
      success: function () {
        // setup widget after collection is fetched
        view.tagSearch = new StackOverflowClone.Widgets.TagSearch({
          selector: view.$('.tag-widget'),
          tags: tags
        });
        // setup listener
        view.listenTo(view.tagSearch.tags, 'add', function () {
          view.tagSearch.render();
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
    $("ul.selected-tags").append($li);
    $li.data("id", tag.id);
    $li.append($("<span>x</span>"));

    this.tagSearch.tags.remove(tag);
  },

  removeTag: function (event) {
    var $li = $(event.currentTarget).parent()
    $(event.currentTarget).remove();
    var tag = new StackOverflowClone.Models.Tag({ id: $li.data("id") });
    var tags = this.tagSearch.tags;

    tag.fetch({
      success: function () {
        tags.add(tag);
      }
    });

    $li.remove();
  },

  submitForm: function (event) {
    event.preventDefault();
    var formData = this.$el.serializeJSON();
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
