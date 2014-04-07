Todos.TodoView = Ember.View.extend({
  tagName: 'li',
  classNameBindings: ['controller.isCompleted:completed','controller.isEditing:editing'],
  isCompleted: function() {
    return this.get('controller.model.isCompleted');
  }.property('controller.isCompleted'),

  isEditing: function() {
    return this.get('controller.isEditing');
  }.property('controller.isEditing'),

  applyFocus: function() {
    this.$().find('input:first').focus();
  },

  didInsertElement: function() {
    this.scheduleFocus();
  },
  
  scheduleFocus: function() {
    if(this.get('controller.shouldAutoFocus')) {
      Ember.run.scheduleOnce('afterRender', this, this.applyFocus);
    }
  }.observes('controller.shouldAutoFocus')
});