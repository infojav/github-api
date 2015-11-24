define([
  'underscore',
  'backbone',
  'text!userTpl.html',
  'user'
], function(_, Backbone, userTpl, user) {
  'use strict';

  var UserView = Backbone.View.extend({

    tagName: 'li',
    template: _.template(userTpl),

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.render();
    },

    render: function() {
      var output = this.template({
        name: this.model.get('name')
      });

      this.$el.html(output);
      return this;
    }

  });

  return UserView;
});
