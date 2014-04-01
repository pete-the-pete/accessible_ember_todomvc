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
    
    Promise.all([
      this.render('todos/index', {controller: controller})
    ]).then(function() {
      var todo = model.get('content').get('firstObject');
      that.controllerFor('todos').setAutoFocusedItem(todo);
    });
  }
});

Todos.TodosIndexRoute = Todos.LinkedRoute.extend({
  model: function() {
    return this.modelFor('todos');
  },
  renderTemplate: function(controller, model) {
    this._super(controller, model);
  }
});

Todos.TodosActiveRoute = Todos.LinkedRoute.extend({
  model: function() {
    return this.store.filter('todo', function(todo) {
      return !todo.get('isCompleted');
    });
  },
  renderTemplate: function(controller, model) {
    this._super(controller, model);
  }
});

Todos.TodosCompletedRoute = Todos.LinkedRoute.extend({
  model: function() {
    return this.store.filter('todo', function(todo) {
      return todo.get('isCompleted');
    });
  },
  renderTemplate: function(controller, model) {
    this._super(controller, model);
  }
});