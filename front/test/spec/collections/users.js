define([
  'chai',
  'sinonChai',
  // collection
  'users'
], function(chai, sinonChai, Users) {
  'use strict';

  var expect = chai.expect;
  chai.use(sinonChai);

  describe('Collection.Users', function() {

     before(function() {
      this.users = new Users([
        {
          'login': 'login3',
          'name': 'name3'
        },
        {
          'login': 'login3',
          'name': 'name3'
        },
        {
          'login': 'login3',
          'name': 'name3'
        }
      ]);
    });

    after(function() {
      this.users = null;
    });


    describe('operations', function() {
      it('returns an array with the own repos ordered by stars');
      it('returns the number of stars of repos owned by the user');
    });
  });

});
