window.StackOverflowClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Widgets: {},
  initialize: function() {
    new StackOverflowClone.Routers.Router({ $rootEl: $('#content') });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  StackOverflowClone.initialize();
});
