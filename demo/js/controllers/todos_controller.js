Todos.TodosController = Ember.ArrayController.extend({
  activeItem: -1,
  initialRoute: true,

  actions: {
    createTodo: function() {
      //get the title from the field
      var title = this.get('newTitle');
      if(!title.trim()) { return; }

      //create a new model
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      //reset the new title
      this.set('newTitle', '');
      this.set('placeHolder', 'Something different that is not there to begin with?');

      //save the changes
      todo.save();
    },
    clearCompleted: function() {
      var completed = this.filterBy('isCompleted', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  },

  setAutoFocusedItem: function(item, removing) {

    var allTodos,
      length,
      index;

    if(this.get('initialRoute')) {
      this.set('initialRoute', false);
      return;
    }

    if(removing) {
      allTodos = this.get('model'),
      length = allTodos.get('length') - 1,
      index = allTodos.indexOf(item);

      if(!length) {
        this.setAutoFocusedItem(-1);
      } else if(index === length) {
        //autofocus the previous one
        index--;
      } else {
        //autofocus the next one
        index++;
      }
      item = allTodos.objectAt(index);
    }
    this.set('activeItem', item.id);
  },

  hasCompleted: function() {
    return this.get('completed') > 0;
  }.property('completed'),

  completed: function() {
    return this.filterBy('isCompleted', true).get('length');
  }.property('@each.isCompleted'),

  remaining: function() {
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function() {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'item' : 'items';
  }.property('remaining'),

  allAreDone: function(key, value) {
    if(value === undefined) {
      return !!this.get('length') && this.everyProperty('isCompleted', true);
    } else {
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
    }
  }.property('@each.isCompleted')
});