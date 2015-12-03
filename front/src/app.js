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

    // users
		user: 'models/user',
    userTpl: 'templates/userTpl',
    userView: 'views/userView',
    users: 'collections/users',
    // repositories
    repo: 'models/repo',
    repoTpl: 'templates/repoTpl',
    repoView: 'views/repoView',
    repos: 'collections/repos',
    reposView: 'views/reposView',
    // messages
    messageView: 'views/messageView',
    messageTpl: 'templates/messageTpl',

    // Application
    config: 'common/config',
    appRouter: 'routers/appRouter',
    appView: 'views/appView'

	},
});

require([
  'underscore',
	'backbone',
  'config',
	'appView',
	'appRouter'
], function (_, Backbone, config, AppView, appRouter) {
	'use strict';

	// Initialize the application.
	new AppView();
  Backbone.history.start();
});
