define([
  'chai',
  'jquery',
  'user',
  'userView'
], function(chai, $, User, UserView) {
  'user strict';

  var expect = chai.expect;

  describe('Views.userView', function() {

    before(function() {
      this.$fixture = $('<ul id="users"></ul>');
    });

    beforeEach(function() {
      this.model = new User({
          name: 'User Name'
      });
      this.view = new UserView({
        id: 'user-view-test',
        model: this.model
      });

      this.$fixture.append(this.view.$el);
    });

    afterEach(function() {
      this.$fixture.empty();
      this.view.model.destroy();
    });

    after(function() {
      this.$fixture.empty();
    });

    describe('creation', function() {
      it('should be a <li> element', function() {
        expect(this.view.el.tagName.toLowerCase()).to.be.equal('li');
      });

      it('have a user model', function() {
        var model = this.view.model;
        expect(model).to.ok;
        expect(model.get('name')).to.be.string;
      });
    });

    describe('rendering', function() {
      it('returns the view object', function() {
        expect(this.view.render()).to.be.equal(this.view);
      });

      it('produces the correct html', function() {
        expect(this.view.el.innerHTML).contain('User Name');
      });
    });

  });
});
