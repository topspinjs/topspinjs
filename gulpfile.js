// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
//var r3eact = require('gulp-react');
var browserify = require('gulp-browserify');
var es6ify = require('es6ify');
var reactify = require('reactify');

// Lint Task
gulp.task('lint', function () {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function () {
  return gulp.src('./webclient/sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('./public/stylesheets'));
});

/**
 * Optimize and move all images from app to dist
 */
gulp.task('copy', function () {
  return gulp.src('./webclient/images/**/*')
    .pipe(gulp.dest('./public/images'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  // Single entry point to browserify
  gulp.src('./webclient/javascripts/app.js')
    .pipe(
      browserify({
        insertGlobals : true,
        debug : false, //enable source maps
        transform: [reactify, es6ify]
      })
    )
    .pipe(gulp.dest('./public/js/'));
});

// Watch Files For Changes
gulp.task('watch', function () {
  gulp.watch('./webclient/javascripts/**/*.js', ['lint', 'scripts']);
  gulp.watch('./webclient/sass/**/*.sass', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'copy', 'sass', 'scripts', 'watch']);
