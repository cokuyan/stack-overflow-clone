StackOverflowClone.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'root',
    'questions(/page/:page)': 'questionsIndex',
    'questions/new': 'questionNew',
    'questions/:id': 'questionShow',

    'users': 'usersIndex',
    'users/new': 'userNew',
    'users/:id': 'userShow',

    'tags': 'tagsIndex',
    'tags/:id': 'tagShow',

    'login': 'logIn'
  },

  root: function () {
    var collection = new StackOverflowClone.Collections.Questions();
    // TODO: figure out how to do dates in js
    collection.comparator = "created_at";
    collection.fetch();
    var view = new StackOverflowClone.Views.QuestionsIndex({
      collection: collection
    });
    this._swapView(view);
  },


  // Question routes
  questionsIndex: function (page) {
    var collection = new StackOverflowClone.Collections.Questions([], {
      page: page
    });

    collection.comparator = function (model) {
      return -1 * model.get("view_count");
    };

    collection.fetch({
      data: { sort: "view_count"}
    });

    var view = new StackOverflowClone.Views.QuestionsIndex({
      collection: collection,
      header: "Most Viewed Questions"
    });

    this._swapView(view);
  },

  questionNew: function () {
    if (!StackOverflowClone.currentUser.isLoggedIn()) {
      Backbone.history.navigate("#/login", { trigger: true });
      return;
    }
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
    if (StackOverflowClone.currentUser.isLoggedIn()) {
      Backbone.history.navigate("", { trigger: true });
      return;
    }
    var user = new StackOverflowClone.Models.User()
    var view = new StackOverflowClone.Views.UserForm({
      model: user
    });
    this._swapView(view);
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

  // Session routes

  logIn: function (callback) {
    if (StackOverflowClone.currentUser.isLoggedIn()) {
      Backbone.history.navigate("", { trigger: true });
      return;
    }
    var view = new StackOverflowClone.Views.LogIn({
      callback: callback
    });
    this._swapView(view);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(this.currentView.render().$el);
  }
});
