define([
  'jquery',
  'underscore',
  'backbone',
  'common',
  'userView',
  'user'
], function($, _, Backbone, common, UserView, User) {
  'use strict';

  var AppView = Backbone.View.extend({

    el: '#app',

    events: {
      'keypress #new-user':   'createUserOnEnter',
    },

    initialize: function() {
      this.$input = $('#new-user');
    },

    createUserOnEnter: function (e) {
      if (e.which !== common.ENTER_KEY || !this.$input.val().trim()) {
        return;
      }

      var user = new User();
      user.fetchUser(this.$input.val().trim());

      this.$input.val('');
    },
  });

  return AppView;
});
