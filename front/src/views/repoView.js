define([
  'underscore',
  'backbone',
  'text!repoTpl.html',
  'user'
], function(_, Backbone, repoTpl, user) {
  'use strict';

  var RepoView = Backbone.View.extend({

    tagName: 'li',
    className: 'repo',
    template: _.template(repoTpl),

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.render();
    },

    render: function() {
      var output = this.template({
        name: this.model.escape('name'),
        stars: this.model.get('stars')
      });

      this.$el.html(output);

      return this;
    },
  });

  return RepoView;
});

