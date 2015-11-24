define([
  'chai',
  'sinon',
  'sinonChai',
  'common',
  'user'
], function(chai, sinon, sinonChai, common, User) {
  'use strict';

  var expect = chai.expect;
  chai.use(sinonChai);

  describe('Model.User', function() {

    describe('creation', function() {
      it('should be created without default values', function() {
        var user = new User();

        expect(user).be.ok;
      });

      it('sets passed attributes', function() {
        var user = new User({
          'user': 'userName'
        });

        expect(user.get('user')).be.equal('userName');
      });
    });

    describe('modifcation', function() {
      it('fires "change" event when the model change', function() {
        var spy = sinon.spy();
        var user = new User();

        user.on('change', spy );
        user.set({ user: 'newName' });

        expect(spy).to.have.been.called;
      });
    });

    describe('rest calls', function() {

      beforeEach(function() {
        this.server = sinon.fakeServer.create();
        this.server.autoRespond = true;
        this.user = new User();
      });

      afterEach(function() {
        this.server.restore();
        this.user = null;
      });

      it('should set user on request success', function(done) {
        this.server.respondWith("GET", common.API_SERVER + '/users/userName',[
          200, { "Content-Type": "application/json" },
          '[{ "name": "name", "comment": "Hey there" }]'
        ]);

        this.user.once('change', function() {
          done();
        });

        expect(this.user).to.be.ok;
        this.user.fetchUser('userName');
      });

      it('error', function(done) {
        this.server.respond();
        this.user.once('error', function() {
          done();
        });
        expect(this.user).to.be.ok;
        this.user.fetchUser('userName');
      });
    });
  });
});
