define([
  'underscore',
  'backbone',
  'config',
  'repo'
], function(_, Backbone, config, Repo) {
  'use strict';

  var Repos = Backbone.Collection.extend({
    model: Repo,

    comparator: function(repo) {
      return -1 * parseInt(repo.get('stars'));
    },

    fetchAllRepos: function(url) {
      var _this = this;

      this.url = url;

      // return a promise
      return this.fetch({remove: false})
        .then(function(data, textStatus, xhr) {
          // fetch all user repos requesting 'next' Link url (from Header) if exist.
          var links = xhr.getResponseHeader('Link');

          if (links) {
            var rawLinks = links.split(',');
            var link = [];
            var i, j;

            for (i = 0,j = rawLinks.length; i < j; i++) {
              link = /<(.+)>; rel="(.+)";?/ig.exec(rawLinks[i]);

              if (/next/i.test(link[2])) {
                  return _this.fetchAllRepos(link[1]);
              }
            }
          }
        }).fail(function(xhr, textStatus, error) {
          _this.trigger('fetching-error', xhr, textStatus, error);
        });

    },

    parse: function(response) {
      var parsed = _.map(response, function(repo) {
        return {
          name: repo.name,
          /* jshint camelcase: false */
          stars: repo.stargazers_count
        };
      });
      return parsed;
    },

    // remove models one by one from the collection to avoid memory leaks.
    removeAllModels: function() {
      var _model;

      while (_model = this.pop()) {
        _model.destroy();
      }
    }
  });

  return Repos;
});
