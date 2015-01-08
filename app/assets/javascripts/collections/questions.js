StackOverflowClone.Collections.Questions = Backbone.Collection.extend({
  url: 'api/questions',
  model: StackOverflowClone.Models.Question,
  comparator: 'created_at'

});
