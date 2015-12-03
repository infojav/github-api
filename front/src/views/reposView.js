define([
  'underscore',
  'backbone',
  'repos',
  'repoView'
], function(_, Backbone, Repos, RepoView) {
  'use strict';

  var ReposView = Backbone.View.extend({

    tagName: 'ul',
    className: 'repos',

    initialize: function(config) {
      if (config && config.collection && config.collection instanceof Repos) {
        this.collection = config.collection;
        this.render();
      }
    },

    render: function() {
      _.each(this.collection.models, function(repo) {
        var newRepoView = new RepoView({model: repo});

        this.$el.append(newRepoView.$el);
      }, this);

      return this;
    },
  });

  return ReposView;
});
