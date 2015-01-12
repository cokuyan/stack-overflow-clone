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

    var formData = this.$(event.currentTarget).serializeJSON();
    console.log(formData)
    this.model.save(formData, {
      success: function () {
        Backbone.history.navigate("", { trigger: true });
        alert("Please check your email to activate your account");
      },
      error: function (model, resp, c) {
        alert(resp.responseText);
      }
    })
  }
});
