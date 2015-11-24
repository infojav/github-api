define([
  'backbone',
  // model
  'repo'
], function(Backbone, Repo) {
  'use strict';

  // users/:username/repos?type=owner

  var Repos = Backbone.Collection.extend({
    model: Repo,

    defaults: {
      url: ''
    },

    fetchRepos: function(url) {
      this.url = url;
      this.fetch({
        success: function(collection, response) {
        },
        error: function(collection, response) {
          return response;
        }
      });
    }
  });

  return Repos;
});
