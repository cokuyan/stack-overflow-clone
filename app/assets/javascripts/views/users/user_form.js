StackOverflowClone.Views.UserForm = Backbone.View.extend({
  template: JST['users/form'],
  tagName: 'form',
  className: 'new-user-form',

  events: {
    'click button.submit': 'createUser'
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  },

  createUser: function (event) {
    event.preventDefault();

    var formData = this.$el.serializeJSON();
    this.model.save(formData)
  }
});
