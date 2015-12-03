define([
  'chai',
  'sinon',
  'sinonChai',
  'config',
  'repos'
], function(chai, sinon, sinonChai, config, Repos) {
  'use strict';

  var expect = chai.expect;
  chai.use(sinonChai);

  describe('Collection.Repos', function() {

     /*beforeEach(function() {
      this.repos = new Repos([
        {
          'name': 'repo1',
          'fullName': 'repos repo1',
          'description': 'This is the first repo',
          'url': 'repos1/repo/repo1',
          'stargazersCount': 5
        },
        {
          'name': 'repo2',
          'fullName': 'repos repo2',
          'description': 'This is the second repo',
          'url': 'repos1/repo/repo2',
          'stargazersCount': 3
        },
        {
          'name': 'repo3',
          'fullName': 'repos repo3',
          'description': 'This is the third repo',
          'url': 'repos1/repo/repo3',
          'stargazersCount': 7
        }
      ]);
    });*/

    describe('rest calls', function() {

        beforeEach(function() {
          this.server = sinon.fakeServer.create();
          this.server.autoRespond = true;
          this.repos = new Repos();
        });

        afterEach(function() {
          this.server.restore();
          this.repos = null;
        });

        it('should set repos on request success', function(done) {

          this.server.respondWith("GET", 'url',[
            200, { "Content-Type": "application/json" },
            '[{ "name": "name", "comment": "Hey there" }]'
          ]);

          this.repos.once('add', function() {
            done();
          });

          expect(this.repos).to.be.ok;

          this.repos.fetchRepos('url');
        });

        it('error', function(done) {
          this.server.respond();
          this.repos.once('error', function() {
            done();
          });
          expect(this.repos).to.be.ok;
          this.repos.fetchRepos('url');
        });
      });



    describe('operations', function() {
      it('can be ordered by stars');
      it('can be return the number of stars');
    });
  });
});
