"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var sassLint = require("gulp-sass-lint");
var rename = require("gulp-rename");
var prefix = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var browserSync = require("browser-sync").create();
var scripts = [
    "../assets/js/lib/headroom/headroom.min.js",
    "../assets/js/app.js"
  ];

// Configure CSS tasks.
gulp.task("sass", ["sass-lint"], function() {
  return gulp
    .src("../assets/scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
        includePaths: ["node_modules/superior-scss/src"]
      }).on("error", sass.logError)
    )
    .pipe(prefix("last 2 versions"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("../dist/css"))
    .pipe(browserSync.stream());
});

gulp.task('sass-lint', function() {
  return gulp.src('../assets/**/*.scss')
    .pipe(sassLint({
      configFile: '.scss-lint-config.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

// Configure JS.
gulp.task("js", function() {
  return gulp
    .src(scripts)
    .pipe(uglify())
    .pipe(concat("app.js"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("../dist/js"))
    .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task("serve", ["sass", "js"], function() {
  var siteRoot = "../_site";
  browserSync.init({
    files: [siteRoot + "/**"],
    port: 4000,
    server: {
      baseDir: siteRoot
    },
    browser: "Google Chrome"
  });

  gulp.watch("../assets/scss/**/*.scss", ["sass"]);
  gulp.watch("../assets/js/**/*.js", ["js"]);
  gulp.watch("../_site/*.html").on("change", browserSync.reload);
});

gulp.task("default", ["sass", "js", "serve"]);