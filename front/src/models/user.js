define([
  'underscore',
  'backbone',
  'config',
  'repos'
], function(_, Backbone, config, Repos) {
  'use strict';

  var User = Backbone.Model.extend({

    initialize: function() {
      this.set('totalStars', 0);

      this.set('repos', new Repos());
      this.on('change', this.onChange);
      this.on('destroy', this.unsetRepos);
    },

    url: function() {
      return config.API_SERVER + '/users/' + this.get('login');
    },

    onChange: function() {
      if (!this.hasChanged('repos') && !this.hasChanged('totalStars')) {
        var _this = this;
        var ownedReposUrl = this.get('repos_url') + '?type=owner';
        var repos = this.get('repos');

        repos.fetchAllRepos(ownedReposUrl)
          .done(function() {
            // count all stars.
            var stars = repos.reduce(function(memo, model) {
              return memo + parseInt(model.get('stars'));
            }, 0);
            _this.set('totalStars', stars);
            _this.trigger('repos-update');
          }).fail(function(xhr, textStatus, error) {
            _this.trigger('fetching-error', xhr, textStatus, error);
          });
      }
    },

    unsetRepos: function() {
      this.get('repos').removeAllModels();
      this.set('totalStars', 0);
      this.unset('repos');
    },

    sync: function(method, model, options) {
      var _sync = Backbone.sync;

      if (method === 'read') {
        var _options = _.extend(options || {}, config.REQUEST_OPTIONS.user);
        return _sync.apply(this, ['read', model, _options]);
      }
    }


  });

  return User;
});
