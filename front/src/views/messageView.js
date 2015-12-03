define([
  'backbone',
  'text!messageTpl.html',
  'jquery'
], function(Backbone, messageTpl, $) {

  var messageView = Backbone.View.extend({

    template: _.template(messageTpl),

    events: {
      'click .destroy': 'closeView',
    },

    className: 'overlay',

    initialize: function(config) {
      if (config) {document
        this.message = config.message || '';
        this.type = config.type || 'info';
      }

      this.render();
    },

    render: function() {
      var _message = this.message || '';
      var output = this.template({
        message: _message,
        type: this.type
      });

      this.$el.html(output);

      return this;
    },

    closeKey: function(e) {
      e.preventDefault();

      if (e.which === 27) {
        this.closeView();
      }
    },

    closeView: function() {
      // called from 'destroy' event triggered by user.
      this.remove();
    }

  });

  return messageView;
});
