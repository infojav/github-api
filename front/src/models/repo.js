define([
  'backbone'
], function(Backbone) {

  var Repo = Backbone.Model.extend({
    sync: function(method, model, options) {
      var _sync = Backbone.sync;

      if (method === 'read') {
        var _options = _.extend(options || {}, config.REQUEST_OPTIONS.repo);
        return _sync.apply(this, ['read', model, _options]);
      }
    }
  });

  return Repo;
});
