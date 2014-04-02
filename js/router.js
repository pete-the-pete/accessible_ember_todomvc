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

    // I think there is a bug in RSVP.Ember.all
    Promise.all([
      this.render('todos/index', {controller: controller})
    ]).then(function() {
      var todo = controller.get('content').get('firstObject');
      that.controllerFor('todos').setAutoFocusedItem(todo);
    });
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