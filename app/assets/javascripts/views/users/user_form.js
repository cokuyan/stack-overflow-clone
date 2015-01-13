StackOverflowClone.Views.UserForm = Backbone.View.extend({
  template: JST['users/form'],

  events: {
    'submit form': 'createUser'
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  },

  createUser: function (event) {
    event.preventDefault();
    var view = this;
    var formData = this.$(event.currentTarget).serializeJSON();
    this.model.save(formData.user, {
      success: function () {
        Backbone.history.navigate("", { trigger: true });
        alert("Please check your email to activate your account");
      },
      error: function (model, resp) {
        if (resp.responseText === "Password and confirmation do not match") {
          view.displayPasswordError();
        } else {
          view.displayErrors(JSON.parse(resp.responseText));
        }
      }
    })
  },

  displayErrors: function (resp) {
    this.$('input').removeClass("error");
    for (var attr in resp) {
      var $input = this.$("#" + attr);
      $input.addClass("error");
      $input.val("").attr("placeholder", resp[attr][0]);
    }
  },

  displayPasswordError: function () {
    this.$('input').removeClass("error");
    this.$("#password")
      .addClass("error")
      .val("")
      .attr("placeholder", "must match");

    this.$("#password_confirmation")
      .addClass("error")
      .val("")
      .attr("placeholder", "must match");
  }
});
