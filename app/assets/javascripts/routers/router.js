StackOverflowClone.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'root',
    'questions': 'questionsIndex',
    'questions/new': 'questionNew',
    'questions/:id': 'questionShow',

    'users': 'usersIndex',
    'users/new': 'userNew',
    'users/:id': 'userShow',

    'tags': 'tagsIndex',
    'tags/:id': 'tagShow'
  },

  root: function () {
    StackOverflowClone.questions.fetch();
    var view = new StackOverflowClone.Views.QuestionsIndex({
      collection: StackOverflowClone.questions
    });
    this._swapView(view);
  },


  // Question routes
  questionsIndex: function () {
    var collection = new StackOverflowClone.Collections.Questions({
      comparator: 'view_count'
    })
    collection.fetch();
    var view = new StackOverflowClone.Views.QuestionsIndex({
      collection: collection
    });
    this._swapView(view);
  },

  questionNew: function () {
    StackOverflowClone.tags.fetch();

    var question = new StackOverflowClone.Models.Question();
    var view = new StackOverflowClone.Views.QuestionForm({
      model: question,
      collection: StackOverflowClone.tags
    });
    this._swapView(view);
  },

  questionShow: function (id) {
    var question = StackOverflowClone.questions.getOrFetch(id);
    var view = new StackOverflowClone.Views.QuestionShow({
      model: question
    });
    this._swapView(view);
  },


  // User routes

  usersIndex: function () {
    StackOverflowClone.users.fetch();
    var view = new StackOverflowClone.Views.UsersIndex({
      collection: StackOverflowClone.users
    });
    this._swapView(view);
  },

  userShow: function (id) {
    var user = StackOverflowClone.users.getOrFetch(id);
    var view = new StackOverflowClone.Views.UserShow({
      model: user
    });
    this._swapView(view);
  },

  userNew: function () {
    // var user = new StackOverflowClone.Models.User()
    // var view = new StackOverFlowClone.Views.UserForm({
    //   model: user
    // });
    // this._swapView(view);
  },

  // Tag routes

  tagsIndex: function () {
    StackOverflowClone.tags.fetch();
    var view = new StackOverflowClone.Views.TagsIndex({
      collection: StackOverflowClone.tags
    });
    this._swapView(view);
  },

  tagShow: function (id) {
    var tag = StackOverflowClone.tags.getOrFetch(id);
    var view = new StackOverflowClone.Views.TagShow({
      model: tag
    });
    this._swapView(view);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(this.currentView.render().$el);
  }
});
