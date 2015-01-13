StackOverflowClone.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  questionTemplate: JST['shared/question'],
  imageTemplate: JST['users/image'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click span.user-attr': 'showEditInput',
    'blur .user-edit-input': 'editAttribute',
    'click .new-image-link': 'renderImageModal',
    'click .close-modal': 'closeImageModal',
    'change #input-user-image': 'fileInputChange',
    'submit .modal-form': 'submitImage'
  },

  showEditInput: function (event) {
    $div = $(event.currentTarget).parent();
    $div.addClass("hidden");
    $input = $div.siblings("input");
    $input.removeClass("hidden");
    $input.focus();
  },

  editAttribute: function (event) {
    var $input = $(event.currentTarget);
    var attr = $input.data("attr");
    var value = $input.val();
    var attributes = {};
    attributes[attr] = value;

    this.model.save(attributes);
  },

  renderImageModal: function (event) {
    this.$(".modal").removeClass("hidden");
    this.$(".modal-form").append(this.imageTemplate());
  },

  closeImageModal: function (event) {
    this.$(".modal").addClass("hidden");
    this.$(".modal-form").empty();
  },

  fileInputChange: function (event) {
    var view = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      view.$("#preview-user-image").attr("src", reader.result);
      view.model._image = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      view.$("#preview-user-image").attr("src", "");
      delete this.model._image;
    }
  },

  submitImage: function (event) {
    event.preventDefault();
    var view = this;
    var formData = $(event.currentTarget).serializeJSON();

    this.model.save(formData.user, {
      success: function () {
        delete view.model._image;
        view.closeImageModal();
        view.render();
      }
    })

  },

  render: function () {
    if (this.model.questions) {
      this.$el.html(this.template({ user: this.model }));
      this.attachQuestions();
      this.checkIfUser();
    }
    return this;
  },

  attachQuestions: function () {
    this.attachQuestion(
      this.model.questions(),
      '.user-asked ul.user-questions'
    );
    this.attachQuestion(
      this.model.answeredQuestions(),
      '.user-answered ul.user-questions'
    );
  },

  attachQuestion: function (questions, selector) {
    questions.each(function (question) {
      this.$(selector).append(this.questionTemplate({
        question: question
      }));
    }.bind(this));
  },

  checkIfUser: function () {
    if (StackOverflowClone.currentUser.isLoggedIn() &&
        StackOverflowClone.currentUser.id === this.model.id) {
      this.$(".edit").removeClass("hidden");
    }
  }
});
