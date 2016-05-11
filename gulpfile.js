const gulp = require("gulp");
const plugins = require("gulp-load-plugins")();
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const bs = require("browser-sync");
const cp = require("child_process");
const electron = require("electron-prebuilt");

gulp.task("templates", () => {

  gulp.src("src/templates/index.pug")
    .pipe(plugins.pug({
      pretty: true
    }))
    .pipe(gulp.dest("dist"));

});

gulp.task("styles", () => {

  gulp.src("src/styles/index.styl")
    .pipe(plugins.stylus({
      compress: false
    }))
    .pipe(gulp.dest("dist"));

});

gulp.task("scripts", () => {

  browserify("src/scripts/index.js", { debug: true })
    .exclude("electron")
    .transform("babelify", { presets: ["es2015", "react"] })
    .transform("uglifyify", { global: true })
    .bundle()
    .pipe(source("index.js"))
    .pipe(gulp.dest("dist"));

});

gulp.task("electron", ["build"], () => {
  return cp.spawn(electron, ["dist/electron.js"]);
});

gulp.task("build", ["templates", "scripts", "styles"]);

gulp.task("watch", ["electron"], () => {

  gulp.watch(["src/templates/**/*.pug"], ["templates", bs.reload]);
  gulp.watch(["src/scripts/**/*.js"], ["scripts", bs.reload]);
  gulp.watch(["src/styles/**/*.styl"], ["styles", bs.reload]);

});

gulp.task("default", ["watch"]);
