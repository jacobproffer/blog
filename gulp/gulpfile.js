'use strict';

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    cssmin      = require('gulp-cssmin'),
    rename      = require('gulp-rename'),
    prefix      = require('gulp-autoprefixer'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    scripts = [
      '../assets/js/lib/scroll/scrollreveal.min.js',
      '../assets/js/app.js'
    ];

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js'], function() {
    var siteRoot = '../_site';
    browserSync.init({
        files: [siteRoot + '/**'],
        // server: '../_site',
        port: 4000,
        server: {
          baseDir: siteRoot
        },
        browser: "google chrome"
    });

    gulp.watch('../assets/scss/**/*.scss', ['sass']);
    gulp.watch('../assets/js/**/*.js', ['js']);
    gulp.watch('../_site/*.html').on('change', browserSync.reload);
});

// Configure CSS tasks.
gulp.task('sass', function () {
  return gulp.src('../assets/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../dist/css'))
    .pipe(browserSync.stream());
});

// Configure JS.
gulp.task('js', function() {
  return gulp.src(scripts)
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  gulp.watch('../dist/scss/**/*.scss', ['sass']);
  gulp.watch('../dist/js/**/*.js', ['js']);
  gulp.watch('../_site/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'js', 'serve']);
