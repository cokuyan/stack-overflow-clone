StackOverflowClone.Views.QuestionForm = Backbone.View.extend({
  template: JST['questions/form'],
  tagName: 'form',
  className: 'question-form',

  events: {
    'click button.submit': 'submitForm'
  },

  render: function () {
    this.$el.html(this.template({ question: this.model }));
    return this;
  },

  submitForm: function (event) {
    event.preventDefault();
    var formData = this.$el.serializeJSON();
    var view = this;
    this.model.save(formData, {
      success: function () {
        StackOverflowClone.questions.add(view.model);
        Backbone.history.navigate('#/questions/' + view.model.id, {
          trigger: true
        });
      }
    });
  }
})
