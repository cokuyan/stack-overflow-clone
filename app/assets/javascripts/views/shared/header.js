StackOverflowClone.Views.Header = Backbone.View.extend({
  template: JST['shared/header'],
  tagName: 'ul',
  className: 'user-nav group',

  initialize: function (options) {
    this.listenTo(StackOverflowClone.currentUser, "logIn logOut", this.render);
    this.render();
  },

  events: {
    'click #logout-link': 'logOut'
  },

  render: function () {
    this.$el.html(this.template({
      currentUser: StackOverflowClone.currentUser
    }));
    return this;
  },

  logOut: function (event) {
    event.preventDefault();
    StackOverflowClone.currentUser.logOut({
      success: function () {
        Backbone.history.navigate("", { trigger: true });
      }
    });
  }
});
