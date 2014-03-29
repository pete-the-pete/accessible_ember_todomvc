Todos.TodoController = Ember.ObjectController.extend({
  shouldAutoFocus: false,
  isEditing: false,
  needs: 'todos',
  toggleComplete: function(key, value) {
    var model = this.get('model');

    if(value === undefined) {
      return model.get('isCompleted');
    } else {
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property('model.isCompleted'),

  /*setAutoFocusedItem: function(item) {
    this.get('controllers.todos').set('activeItem', item.id);
  },*/

  setShouldAutoFocus: function() {
    var activeItem = this.get('controllers.todos').get('activeItem');
    this.set('shouldAutoFocus', (activeItem === this.get('model').id));

  }.observes('controllers.todos.activeItem'),

  actions: {
    editTodo: function() {
      this.set('isEditing', true);
    },
    acceptChanges: function() {
      this.set('isEditing', false);

      if(Ember.isEmpty(this.get('model.title'))) {
        this.send('removeTodo');
      } else {
        this.get('model').save();
        this.get('controllers.todos').setAutoFocusedItem(this.get('model'));
      }
    },
    removeTodo: function() {
      var todo = this.get('model');

      //figure out which element should be focused next
      this.get('controllers.todos').setAutoFocusedItem(todo, true);

      //delete the item and update the model
      todo.deleteRecord();
      todo.save();
    }
  }
});