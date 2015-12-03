define([
  'underscore',
  'backbone',
  'config',
  'appRouter',
  'messageView',
  'userView',
  'users',
  'user'
], function(_, Backbone, config, appRoute, MessageView, UserView, usersCollection, User) {
  'use strict';

  var AppView = Backbone.View.extend({

    el: 'body',

    events: {
      'keypress .new-user':   'onKeypress',
    },

    initialize: function() {
      // nav
      this.$userData = this.$('#user-data');
      this.$ranking = this.$('#ranking');

      // app
      this.$input = this.$('input.new-user');
      this.$userList = this.$('.user-list');

      this.listenTo(appRoute, 'route:user-data', this.userData);
      this.listenTo(appRoute, 'route:ranking', this.ranking);

      this.listenTo(usersCollection, 'repos-update', this.checkRanking);
      this.listenTo(usersCollection, 'remove', this.checkRanking);
    },

    userData: function(user) {
      this.mode = 'user-data';
      usersCollection.removeAllModels();

      if (user) {
        this.addUser(user);
      }

      this.highlightButton();
    },

    ranking: function() {
      this.mode = 'ranking';
      usersCollection.removeAllModels();

      this.highlightButton();
    },

    checkRanking: function() {
      if (usersCollection.length && this.mode == 'ranking') {
        var model = usersCollection.max(function(model) {
          return model.get('totalStars');
        });
        var $max = this.$('#' + model.cid);

        if (this.$max || (this.$max != $max)) {
          this.$max && this.$max.removeClass('max-stars');
          this.$max = $max;
          $max.addClass('max-stars');
        }
      }
    },

    highlightButton: function(button) {
      switch (this.mode) {
        case 'user-data':
          this.$userData.addClass('selected');
          this.$ranking.removeClass('selected');
          break;
        case 'ranking':
          this.$ranking.addClass('selected');
          this.$userData.removeClass('selected');
          break;
      }
    },

    onKeypress: function(e) {
      if (!this.message) {
        this.input(e.which);
      } else {
        e.preventDefault();
        this.message.remove();
        this.message = null;
      }
    },

    input: function (key) {
      if (key !== config.ENTER_KEY || !this.$input.val().trim()) {
        return;
      }

      this.addUser(this.$input.val().trim());
      this.$input.val('');
    },

    addUser: function(userName) {
      var _this = this;
      var showWithRepos = false;
      var user;


      if (this.mode === 'user-data') {
        usersCollection.removeAllModels();
        showWithRepos = true;
      } else { // ranking

      }

      user = new User({
        login: userName
      });

      user.fetch()
        .done(function() {
            var userView = new UserView({
              model: user,
              showWithRepos: showWithRepos
            });

          usersCollection.add(user);
          _this.$userList.append(userView.el);
        })
        .fail(function(xhr, textStatus, error) {
          _this.trigger('fetching-error', xhr, textStatus, error);
          _this.showError('Error: ' + xhr.statusText);
        });
    },

    showError: function(message) {
      this.message = new MessageView({
        message: message,
        type: 'error'
      });

      this.$el.append(this.message.$el);
    },

    showMessage: function(message) {
      this.message = new MessageView({
        message: message
      });

      this.$el.append(this.message.$el);
    }
  });

  return AppView;
});
