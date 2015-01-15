StackOverflowClone.Collections.Users = Backbone.Collection.extend({
  url: function () {
    return 'api/users/page/' + (this.page || 1);
  },
  model: StackOverflowClone.Models.User,

  initialize: function (models, options) {
    if (options) {
      this.page = options.page || 1
    }
  },

  parse: function (resp) {
    if (resp.page) {
      this.page = resp.page;
      this.total_pages = resp.total_pages;
      return resp.users;
    } else {
      return resp;
    }
  },

  getOrFetch: function (id) {
    var user = this.get(id);
    var users = this;
    if (!user) {
      user = new StackOverflowClone.Models.User({ id: id });
      user.fetch({
        success: function () {
          users.add(user);
        }
      });
    } else {
      user.fetch();
    }
    return user;
  }

});

StackOverflowClone.users = new StackOverflowClone.Collections.Users();
StackOverflowClone.users.fetch();
