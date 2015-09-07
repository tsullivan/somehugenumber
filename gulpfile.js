/*eslint-disable no-console*/
var gulp = require('gulp');
var webpack = require('webpack-stream');
var concat = require('gulp-concat');

// for development
gulp.task('webpack', function() {
	return gulp.src('public/app/modules/index.js')
	.pipe(webpack(require('./webpack.config.js')))
	.pipe(gulp.dest('.')); // filename set in webpack.config.js
});

gulp.task('vendor', function() {
	return gulp.src([
		'public/app/bower_components/angular/angular.js',
		'public/app/bower_components/angular-route/angular-route.js'
	])
	.pipe(concat('vendor.js'))
	.pipe(gulp.dest('public/javascripts/'));
});

gulp.task('default', ['webpack', 'vendor']);
