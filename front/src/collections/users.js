// singleton
define([
  'backbone',
  'user'
], function(Backbone, User) {
  'use strict';

  var UsersCollection = Backbone.Collection.extend({
    model: User,

    initialize: function() {
      this.mostStarred;
      this.listenTo(this.model, 'repos-update', this.reposChanged);
    },

    // remove models one by one from the collection to avoid memory leaks.
    removeAllModels: function() {
      var _model;

      while (_model = this.pop()) {
        _model.destroy();
      }
    },

    mostStarred: function() {
      return this.reduce(function(mostStarred, model) {
        if (mostStarred.get('totalStars') < model.get('totalStars')) {
          return model;
        }
        return mostStarred;
      })
    },

    reposChanged: function() {
      this.trigger('repos-update', this.model);
    }

  });

  return new UsersCollection();
});
