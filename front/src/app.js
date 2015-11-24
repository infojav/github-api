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

		user: 'models/user',
    userTpl: 'templates/userTpl',
    userView: 'views/userView',

    appView: 'views/appView',
    common: 'common',
    users: 'collections/users',
    repos: 'collections/repos',
    repo: 'models/repo'
	},
});

require([
	//'backbone'
	'appView'
	//'routers/router'
], function (AppView) {
	'use strict';

  console.log('Application running.');

	// Initialize the application view
	new AppView();
});
