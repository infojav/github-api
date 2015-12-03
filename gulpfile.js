'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rjsOptimize = require('gulp-requirejs-optimize');
var minifyCss = require('gulp-minify-css');

//var rjs = require('gulp-r');

gulp.task('sass', function () {
  gulp.src('./front/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./front/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./front/scss/main.scss', ['sass']);
});

gulp.task('minify-css', function() {
  return gulp.src('./front/css/main.css')
    .pipe(minifyCss({compatibility: 'ie9'}))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('optimize', function() {
  gulp.src('front/src/*.js')
      .pipe(rjsOptimize({
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
          'generateSourceMaps': true,
          'optimize': 'uglify2',
          'preserveLicenseComments': false
      }))
      .pipe(gulp.dest('dist/scripts'));
});

gulp.task('default', ['sass', 'optimize', 'minify-css']);
