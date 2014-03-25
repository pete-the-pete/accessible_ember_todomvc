Todos.EditTodoView = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  },
  acceptChanges: function() {
    this.set('isEditing', false);

    if(Ember.isEmpty(this.get('model.title'))) {
      this.send('removeTodo');
    } else {
      this.get('model').save();
    }
  }
});

Ember.Handlebars.helper('edit-todo', Todos.EditTodoView);