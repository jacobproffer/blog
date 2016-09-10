"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del');

gulp.task("concatScripts", function() {
    return gulp.src([
        'assets/js/jquery-2.2.3.min.js',
        'assets/js/main.js'
        ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('assets/js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("assets/js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('compileSass', function() {
  return gulp.src("assets/scss/project-main.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('assets/css'));
});

gulp.task('watchSass', function() {
  gulp.watch('assets/scss/**/*.scss', ['compileSass']);
})

gulp.task('clean', function() {
  del(['dist', 'assets/css/project-main.css*', 'assets/js/app*.js*']);
});

gulp.task("build", ['minifyScripts', 'compileSass'], function() {
  return gulp.src(["assets/css/project-main.css", "assets/js/app.min.js", 'index.php'], { base: './'})
            .pipe(gulp.dest('dist'));
});

gulp.task("default", ["build"]);
