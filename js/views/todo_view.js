Todos.TodoView = Ember.View.extend({
  tagName: 'li',
  classNameBindings: ['controller.isCompleted:completed','controller.isEditing:editing'],
  isCompleted: function() {
    return this.get('controller.model.isCompleted');
  }.property('controller.isCompleted'),
  isEditing: function() {
    return this.get('controller.isEditing');
  }.property('controller.isEditing')
});