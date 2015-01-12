window.StackOverflowClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Widgets: {},
  initialize: function() {

    this.currentUser = new StackOverflowClone.Models.CurrentUser();
    this.currentUser.fetch();

    this.header = new StackOverflowClone.Views.Header({ el: "header" })

    new StackOverflowClone.Routers.Router({ $rootEl: $('#content') });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  StackOverflowClone.initialize();
});
