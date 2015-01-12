StackOverflowClone.Views.LogIn = Backbone.View.extend({
  template: JST["shared/login"],
  initialize: function (options) {
    this.callback = options.callback;
    this.listenTo(StackOverflowClone.currentUser, "logIn", this.logInCallback);
  },

  events: {
    "submit form": "submit"
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON().user;

    StackOverflowClone.currentUser.logIn({
      nameOrEmail: formData.name_or_email,
      password: formData.password,
      error: function (model, resp) {
        if (resp.responseText == "Not activated") {
          alert("Please check your email to activate your account.")
        } else {
          alert("Invalid username/email/password combination")
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
