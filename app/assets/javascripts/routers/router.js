StackOverflowClone.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'root',
    'questions': 'questionsIndex',
    'questions/new': 'questionNew',
    'questions/:id': 'questionShow'
  },

  root: function () {
    // StackOverflowClone.comparator = 'created_at';
    StackOverflowClone.questions.fetch();
    var view = new StackOverflowClone.Views.QuestionsIndex({
      collection: StackOverflowClone.questions
    });
    this._swapView(view);
  },

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

  },

  questionShow: function (id) {
    var question = StackOverflowClone.questions.getOrFetch(id);
    var view = new StackOverflowClone.Views.QuestionShow({
      model: question
    });
    this._swapView(view);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(this.currentView.render().$el);
  }
});
