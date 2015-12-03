// singleton
//
define([
  'backbone'
], function(Backbone) {
  'use strict';

  var AppRoute = Backbone.Router.extend({

    routes: {
      '': 'user-data',
      'users/:id': 'user-data',
      'ranking': 'ranking',
      '.*': 'not-found'
    },
  });

  return new AppRoute();
});
