define([
  'underscore',
  'backbone',
  'text!userTpl.html',
  'reposView'
], function(_, Backbone, userTpl, ReposView) {
  'use strict';

  var UserView = Backbone.View.extend({

    tagName: 'li',
    className: 'user',
    template: _.template(userTpl),
    showWithRepos: false,

    events: {
      'click .destroy': 'clear',
      'mouseover':      'showClose',
      'mouseleave':     'hideClose'
    },

    initialize: function(options) {
      if (options && options.showWithRepos) {
        this.showWithRepos = options.showWithRepos;
      }
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.closeView);
      this.listenTo(this.model, 'repos-update', this.reposUpdate);
      this.render();
    },

    render: function() {
      var output = this.template({
        id: this.model.id,
        login: this.model.escape('login'),
        name: this.model.escape('name'),
        /* jshint camelcase: false */
        avatar_url: this.model.escape('avatar_url')
      });

      this.$el.attr('id', this.model.cid);
      this.$el.html(output);

      return this;
    },

    showClose: function(e) {
      e.preventDefault();
      this.$('.destroy').removeClass('hidden');
    },

    hideClose: function(e) {
      e.preventDefault();
      this.$('.destroy').addClass('hidden');
    },

    clear: function(e) {
      e.preventDefault();
      this.model.destroy();
      // trigger event 'destroy' from model.
    },

    closeView: function() {
      // called from 'destroy' event triggered by model.
      this.remove();
    },

    reposUpdate: function() {
      var $totalStars = this.$('.stars');
      var text = $totalStars.text();

      $totalStars.text(text + this.model.get('totalStars'));
      $totalStars.removeClass('hidden');

      if (this.showWithRepos) {
        this.showRepos();
      }
    },

    showRepos: function() {
      var newReposView = new ReposView({
        collection: this.model.get('repos')
      });

      this.$el.append(newReposView.$el);
    },

    hideRepos: function() {

    }

  });

  return UserView;
});
