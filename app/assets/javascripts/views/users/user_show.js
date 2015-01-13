StackOverflowClone.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  questionTemplate: JST['shared/question'],
  imageTemplate: JST['users/image'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    $('.modal').on('click', '.close-modal', this.closeImageModal);
    $('.modal').on('change', '#input-user-image', this.fileInputChange.bind(this));
    $('.modal').on('submit', this.submitImage.bind(this));
  },

  events: {
    'click span.user-attr': 'showEditInput',
    'blur .user-edit-input': 'editAttribute',
    'click .new-image-link': 'renderImageModal'
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
    $(".modal").removeClass("hidden");
    $(".modal-form").append(this.imageTemplate());
  },

  closeImageModal: function (event) {
    $(".modal").addClass("hidden");
    $(".modal-form").empty();
  },

  fileInputChange: function (event) {
    var view = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      $("#preview-user-image").attr("src", reader.result);
      view.model._image = reader.result;

      console.log(view.model);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      $("#preview-user-image").attr("src", "");
      delete this.model._image;

      console.log(this.model);
    }
  },

  submitImage: function (event) {
    event.preventDefault();
    var view = this;
    var formData = $(event.currentTarget).find("form").serializeJSON();

    this.model.save(formData.user, {
      success: function () {
        delete view.model._image;
        view.closeImageModal();
        view.render();
        console.log(view.model)
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
