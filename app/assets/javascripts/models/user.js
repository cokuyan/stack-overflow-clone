StackOverflowClone.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  toJSON: function () {
    var json = { user: _.clone(this.attributes) };

    if (this._image) {
      json.user.image = this._image;
    }
    return json;
  },

  questions: function () {
    if (!this._questions) {
      this._questions = new StackOverflowClone.Collections.Questions([], {
        author: this
      });
    }
    return this._questions
  },

  answeredQuestions: function () {
    if (!this._answeredQuestions) {
      this._answeredQuestions = new StackOverflowClone.Collections.Questions([], {
        author: this
      });
    }
    return this._answeredQuestions;
  },

  parse: function (resp) {
    if (resp.questions) {
      this.questions().set(resp.questions, { parse: true });
      delete resp.questions;
    }
    if (resp.answered_questions) {
      this.answeredQuestions().set(resp.answered_questions, { parse: true });
      delete resp.answered_questions;
    }
    return resp;
  }

});

StackOverflowClone.Models.CurrentUser = StackOverflowClone.Models.User.extend({
  url: "api/session",

  initialize: function (options) {
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isLoggedIn: function () {
    return !this.isNew();
  },

  logIn: function (options) {
    var user = this;
    var credentials = {
      "user[name_or_email]": options.nameOrEmail,
      "user[password]": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function (data) {
        user.set(data);
        options.success && options.success();
      },
      error: function (resp) {
        options.error && options.error(resp);
      }
    })
  },

  logOut: function (options) {
    var user = this;

    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function (data) {
        user.clear();
        options.success && options.success();
      }
    });
  },

  fireSessionEvent: function () {
    if (this.isLoggedIn()) {
      this.trigger("logIn");
      console.log("logged in", this);
    } else {
      this.trigger("logOut");
      console.log("logged out", this);
    }
  }

});
