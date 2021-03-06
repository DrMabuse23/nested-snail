var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var traceur = require('gulp-traceur');
var connectLiveReload = require('connect-livereload');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var PATHS = {
  src: {
    js: 'src/**/*.js',
    assets: 'src/assets/**/*',
    html: 'src/**/*.html',
    lib:'node_modules/*'
  },
  lib: [
    'node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js',
    'node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.src.js',
    'node_modules/systemjs/lib/extension-cjs.js',
    'node_modules/systemjs/lib/extension-register.js',
    'node_modules/angular2/node_modules/zone.js/zone.js',
    'node_modules/angular2/node_modules/zone.js/long-stack-trace-zone.js',
    'node_modules/angular2/node_modules/rx/dist/rx.all.js'
  ]
};
var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var open = require('open');
var port = 9000, app;

gulp.task('clean', function (done) {
  del(['dist'], done);
});

gulp.task('js', function () {
  return gulp.src(PATHS.src.js)
    .pipe(rename({extname: ''})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
    .pipe(plumber())
    .pipe(traceur({
      modules: 'instantiate',
      moduleName: true,
      annotations: true,
      types: true,
      memberVariables: true
    }))
    .pipe(rename({extname: '.js'})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
    .pipe(sourcemaps.write('.'))
    .pipe(livereload())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));

});

gulp.task('html', function () {
  return gulp.src(PATHS.src.html)
    .pipe(livereload())
    .pipe(gulp.dest('dist'));
});
gulp.task('libs', ['angular2', 'gsap', 'snapsvg'], function () {
  return gulp.src(PATHS.lib)
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('angular2', function () {
  //transpile & concat
  return gulp.src([
      'node_modules/angular2/es6/prod/*.es6',
      'node_modules/angular2/es6/prod/src/**/*.es6'],
    {base: 'node_modules/angular2/es6/prod'})
    .pipe(rename(function (path) {
      path.dirname = 'angular2/' + path.dirname; //this is not ideal... but not sure how to change angular's file structure
      path.extname = ''; //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
    }))
    .pipe(traceur({modules: 'instantiate', moduleName: true}))
    .pipe(concat('angular2.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/lib'));
});
gulp.task('gsap', function () {
  //transpile & concat
  return gulp.src([
      'node_modules/gsap/src/uncompressed/TimelineLite.js',
      'node_modules/gsap/src/uncompressed/TweenLite.js',
      'node_modules/gsap/src/uncompressed/plugins/**/*.js',
      'node_modules/gsap/src/uncompressed/utils/Draggable.js'],
    {base: 'node_modules/gsap/src/uncompressed'})
    .pipe(rename(function (path) {
      path.dirname = 'gsap/' + path.dirname; //this is not ideal... but not sure how to change angular's file structure
      path.extname = ''; //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
    }))
    .pipe(traceur({modules: 'instantiate', moduleName: true}))
    .pipe(concat('gsap.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/lib'));
});
gulp.task('snapsvg', function () {
  //transpile & concat
  return gulp.src([
      'node_modules/snapsvg/dist/snap.svg.js'],
    {base: 'node_modules/snapsvg/dist'})
    .pipe(rename(function (path) {
      path.dirname = 'snapsvg/' + path.dirname; //this is not ideal... but not sure how to change angular's file structure
      path.extname = ''; //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
    }))
    .pipe(traceur({modules: 'instantiate', moduleName: true}))
    .pipe(concat('snap.svg.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/lib'));
});
gulp.task('assets', function () {
  return gulp.src(PATHS.src.assets)
    .pipe(livereload())
    .pipe(gulp.dest('dist/assets'));
});
gulp.task('start', ['default'], function () {

  livereload.listen();
  gulp.watch(PATHS.src.html, ['html']);
  gulp.watch(PATHS.src.js, ['js']);
  gulp.watch(PATHS.src.assets, ['assets']);
  gulp.watch(PATHS.src.lib, ['angular2', 'gsap', 'snapsvg']);

  app = connect().use(connectLiveReload({port: 35729}));
  app.use(serveStatic(__dirname + '/dist'));  // serve everything that is static
  http.createServer(app).
    listen(port, function () {
    open('http://localhost:' + port);
      livereload.reload();
  });
});

gulp.task('default', ['js', 'html', 'libs', 'assets']);
