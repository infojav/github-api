define([
  'backbone',
  'common',
  'repos'
], function(Backbone, common, Repos) {
  'use strict';

  var ReposCollection = Repos;
  var User = Backbone.Model.extend({

    initialize: function() {
      this.reposCollection = ReposCollection;
      this.on('set_repos', function() {
        var ownReposUrl = this.get('repos_url') + '?type=owner';
        this.repos = new Repos();
        this.repos.fetchRepos(ownReposUrl);
      });
    },

    fetchUser: function(user) {
      this.url = common.API_SERVER + '/users/' + user;

      this.fetch({
        success: function(model) {
          model.trigger('set_repos');
        },
        error: function(model, response) {
          return response;
        }
      });
    }
  });

  return User;
});
