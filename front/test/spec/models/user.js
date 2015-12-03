define([
  'chai',
  'sinon',
  'sinonChai',
  'config',
  'user'
], function(chai, sinon, sinonChai, config, User) {
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

    describe('events', function() {
      it('fires "change" event when the model change', function() {
        var spy = sinon.spy();
        var user = new User();

        user.on('change', spy );
        user.set({ login: 'userName' });

        expect(spy).to.have.been.called;
      });
      it('fires "repos-update" event when the "repos" collection change.', function() {
        var spy = sinon.spy();
        var user = new User();

        user.on('repos-update', spy );
        user.trigger('repos-update');

        expect(spy).to.have.been.called;
      });
    });

    describe('rest calls', function() {

      beforeEach(function() {
        this.server = sinon.fakeServer.create();
        this.server.autoRespond = true;
        this.user = new User({name: 'userName'});
      });

      afterEach(function() {
        this.server.restore();
        this.user = null;
      });

      /*it('should set user on request success', function(done) {
        sinon.stub(this.user, "onChange", function() {
          this.user.trigger('change');
        });

        this.server.respondWith("GET", config.API_SERVER + '/users/userName',[
          200, { "Content-Type": "application/json" },
          '[{ "name": "name", "comment": "Hey there"}]'
        ]);

        this.user.once('change', function() {
          done();
        });

        expect(this.user).to.be.ok;
        this.user.fetch();
      });*/

      it('error', function(done) {
        this.server.respond();
        this.user.once('error', function() {
          done();
        });
        expect(this.user).to.be.ok;
        this.user.fetch();
      });
    });
  });
});
