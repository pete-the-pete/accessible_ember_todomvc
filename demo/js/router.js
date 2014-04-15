Todos.Router.map(function() {
  this.resource('todos', {path: '/'}, function() {
    //subroutes
    this.route('active');
    this.route('completed')
  });
});

Todos.TodosRoute =  Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});

Todos.LinkedRoute = Ember.Route.extend({

  renderTemplate: function(controller, model) {
    var that = this;

    this.render('todos/index', {controller: controller});
    Ember.run.later(this, function() {
      var todo = model.get('firstObject');
      this.controllerFor('todos').setAutoFocusedItem(todo);
    }, 500);
  }
});

Todos.TodosIndexRoute = Todos.LinkedRoute.extend({
  model: function() {
    return this.modelFor('todos');
  }
});

Todos.TodosActiveRoute = Todos.LinkedRoute.extend({
  model: function() {
    return this.store.filter('todo', function(todo) {
      return !todo.get('isCompleted');
    });
  }
});

Todos.TodosCompletedRoute = Todos.LinkedRoute.extend({
  model: function() {
    return this.store.filter('todo', function(todo) {
      return todo.get('isCompleted');
    });
  }
});