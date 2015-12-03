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

    // config
    config: 'spec/common/config',
    // users
    user: '../src/models/user',
    userTpl: '../src/templates/userTpl',
    userView: '../src/views/userView',
    users: '../src/collections/users',
    // repositories
    repo: '../src/models/repo',
    repoTpl: '../src/templates/repoTpl',
    repoView: '../src/views/repoView',
    repos: '../src/collections/repos',
    reposView: '../src/views/reposView',
    // messages
    messageView: '../src/views/messageView',
    messageTpl: '../src/templates/messageTpl',

    // Application
    appRouter: '../src/routers/appRouter',
    appView: '../src/views/appView'
	},
	urlArgs: 'bust=' + (new Date()).getTime()
});

define(function(require) {
	'use strict';

	require('mocha');

	mocha.setup({
    'ui': 'bdd',
    'reporter': 'html',
    'timeout': 600,
    'slow': 500
  });

	require([
    // users
    'spec/models/user',
    'spec/views/userView',
    //'spec/collections/users',

    // repositories
    'spec/models/repo',
    //'spec/collections/repos',
    //'spec/views/repoView',
    //'spec/views/reposView',

    // messages
    //'spec/views/messageView',

    // router
    // 'spec/router/appRouter'
	], function(require) {
		mocha.run();
	});
});
