"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var sassLint = require("gulp-sass-lint");
var rename = require("gulp-rename");
var prefix = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var eslint = require("gulp-eslint");
var browserSync = require("browser-sync").create();
var scripts = [
  "../assets/js/lib/headroom/headroom.min.js",
  "../assets/js/lib/blazy/blazy.min.js",
  "../assets/js/app.js"
];

gulp.task("sass-lint", function() {
  return gulp
    .src("../assets/**/*.scss")
    .pipe(
      sassLint({
        configFile: ".scss-lint-config.yml"
      })
    )
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task("sass", ["sass-lint"], function() {
  return gulp
    .src("../assets/scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(prefix("last 2 versions"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("../dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("js-lint", function() {
  return gulp
    .src(scripts)
    .pipe(
      eslint({
        configFile: ".eslintrc",
        fix: true
      })
    )
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("js", ["js-lint"], function() {
  return gulp
    .src(scripts)
    .pipe(uglify())
    .pipe(concat("app.js"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("../dist/js"))
    .pipe(browserSync.stream());
});

gulp.task("serve", ["sass", "js"], function() {
  var siteRoot = "../_site";
  browserSync.init({
    files: [siteRoot + "/**"],
    port: 4000,
    server: {
      baseDir: siteRoot
    },
    browser: "Firefox"
  });

  gulp.watch("../assets/scss/**/*.scss", ["sass"]);
  gulp.watch("../assets/js/**/*.js", ["js"]);
  gulp.watch("../_site/*.html").on("change", browserSync.reload);
});

gulp.task("default", ["sass", "js", "serve"]);
