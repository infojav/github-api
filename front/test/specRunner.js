// http://mdcox.net/posts/browser-unit-testing-with-backbone-mocha-chai-and-requirejs.html

require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
	},
	paths: {
		jquery: '../../node_modules/jquery/dist/jquery',
		underscore: '../../node_modules/underscore/underscore',
		backbone: '../../node_modules/backbone/backbone',
		text: '../../node_modules/requirejs-text/text',
		mocha: '../../node_modules/mocha/mocha',
		chai: '../../node_modules/chai/chai',
    sinon: '../../node_modules/sinon/lib/sinon',
		sinonChai: '../../node_modules/sinon-chai/lib/sinon-chai',

    common: '../src/common',
		user: '../src/models/user',
    userTpl: '../src/templates/userTpl',
    userView: '../src/views/userView',
    users: '../src/collections/users',
    repo: '../src/models/repo',
    repos: '../src/collections/repos'
	},
	urlArgs: 'bust=' + (new Date()).getTime()
});

define(function(require) {
	'use strict';

	require('mocha');

	mocha.setup({
    'ui': 'bdd',
    'reporter': 'html',
    'timeout': 2000,
    'slow': 500
  });

	require([
    'spec/models/user',
    'spec/views/userView',
    'spec/collections/users',
    'spec/models/repo',
    'spec/collections/repos'
	], function(require) {
		mocha.run();
	});
});
