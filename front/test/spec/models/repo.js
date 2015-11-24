define([
  'chai',
  'repo'
], function(chai, Repo) {
  'use strict';

  var expect = chai.expect;

  describe('Model.Repo', function() {

    it('set passed attribute', function() {
      var repo = new Repo({
        'name': 'repoName',
      });

      expect(repo.get('name')).be.equal('repoName');
    });
  });
});
