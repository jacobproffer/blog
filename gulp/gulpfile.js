"use strict";

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  rename = require("gulp-rename"),
  prefix = require("gulp-autoprefixer"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  browserSync = require("browser-sync").create(),
  scripts = [
    "../assets/js/lib/headroom/headroom.min.js",
    "../assets/js/lib/headroom/jQuery.headroom.js",
    "../assets/js/app.js"
  ];

// Static Server + watching scss/html files
gulp.task("serve", ["sass", "js"], function() {
  var siteRoot = "../_site";
  browserSync.init({
    files: [siteRoot + "/**"],
    port: 4000,
    server: {
      baseDir: siteRoot
    },
    browser: "google chrome"
  });

  gulp.watch("../assets/scss/**/*.scss", ["sass"]);
  gulp.watch("../assets/js/**/*.js", ["js"]);
  gulp.watch("../_site/*.html").on("change", browserSync.reload);
});

// Configure CSS tasks.
gulp.task("sass", function() {
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

gulp.task("default", ["sass", "js", "serve"]);
