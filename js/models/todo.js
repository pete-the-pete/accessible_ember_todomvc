Todos.Todo = DS.Model.extend({
 title: DS.attr('string'),
 isCompleted: DS.attr('boolean')
});

Todos.Todo.FIXTURES = [
  {
    id: 1,
    title: 'type some characters',
    isCompleted: true
  },
  {
    id: 2,
    title: '...',
    isCompleted: false
  },
  {
    id: 3,
    title: 'claim to have done something',
    isCompleted: false
  }
];