Todos.TodosController = Ember.ArrayController.extend({
  placeHolder: 'I am the default. There are many like it, but this one is mine.',
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
    }
  },
  remaining: function() {
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),
  inflection: function() {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'item' : 'items';
  }.property('remaining')
});