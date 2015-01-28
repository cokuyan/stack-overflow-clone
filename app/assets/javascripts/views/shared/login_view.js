StackOverflowClone.Views.LogIn = Backbone.View.extend({
  template: JST["shared/login"],
  initialize: function (options) {
    this.callback = options.callback;
    this.listenTo(StackOverflowClone.currentUser, "logIn", this.logInCallback);
  },

  events: {
    "click .guest": "loginAsGuest",
    "submit form": "submit"
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  loginAsGuest: function (event) {
    event.preventDefault();

    $.ajax({
      url: "/api/users/demo",
      method: "POST",
      success: function (user) {
        this.$("#name-or-email").val(user.username);
        this.$("#password").val("password");
        this.$("form").trigger("submit");
      }.bind(this),
    });
  },

  submit: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON().user;

    StackOverflowClone.currentUser.logIn({
      nameOrEmail: formData.name_or_email,
      password: formData.password,
      error: function (resp) {
        if (resp.responseText == "Not activated") {
          alert("Please check your email to activate your account.");
          Backbone.history.navigate("", { trigger: true });
        } else {
          alert("Invalid username/email/password combination");
        }
      }
    });
  },

  logInCallback: function (event) {
    if (this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  }
});
