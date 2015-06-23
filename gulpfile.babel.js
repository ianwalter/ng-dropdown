var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    karma = require('gulp-karma'),
    connect = require('gulp-connect'),
    myth = require('gulp-myth'),
    minifyCSS = require('gulp-minify-css'),
    stylish = require('jshint-stylish'),
    babel = require('gulp-babel'),
    debug = false,
    WATCH_MODE = 'watch',
    RUN_MODE = 'run';

var mode = WATCH_MODE;

// Lints JavaScript code style based on jshint rules in .jshintrc
gulp.task('lint', () => {
  gulp.src('src/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

//gulp.task('karma', function() {
//  // undefined.js: unfortunately necessary for now
//  gulp.src(['undefined.js'])
//    .pipe(karma({
//      configFile: 'karma.conf.js',
//      action: mode
//    }))
//    .on('error', function() {});
//});

// Creates distribution and minified distribution file from source
gulp.task('js', () => {
  var jsTask = gulp
    .src('src/**/*.js')
    .pipe(babel())
    .pipe(concat('ng-dropdown.js'))
    .pipe(gulp.dest('dist/js'));
  if (!debug) {
    jsTask.pipe(uglify());
  }
  jsTask
    .pipe(rename('ng-dropdown.min.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('css', function () {
  var cssTask = gulp
    .src('src/css/**/*.css')
    .pipe(concat('ng-dropdown.css'))
    .pipe(myth())
    .pipe(gulp.dest('dist/css'));
  if (!debug) {
    cssTask.pipe(minifyCSS());
  }
  cssTask
    .pipe(rename('ng-dropdown.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  gulp.watch(['index.html'], function() {
    gulp.src(['index.html'])
      .pipe(connect.reload());
  });

  connect.server({
    livereload: true
  });
});

//gulp.task('kill-connect', ['protractor'], function() {
//  connect.serverClose();
//});

gulp.task('run-mode', function() {
  mode = RUN_MODE;
});

gulp.task('debug', function() {
  debug = true;
});

// Watches files for changes and re-runs relevant tasks
gulp.task('watch', () => {
  var jsWatcher = gulp.watch('src/**/*.js', gulp.parallel('lint', 'js')),
      cssWatcher = gulp.watch('src/**/*.css', gulp.parallel('css'));

  function changeNotification(event) {
    console.log('File', event.path, 'was', event.type);
  }

  jsWatcher.on('change', changeNotification);
  cssWatcher.on('change', changeNotification);
});


gulp.task('default', gulp.parallel('lint', 'js', 'watch'));

gulp.task('server', gulp.parallel('connect', 'default'));

//gulp.task('test', ['run-mode', 'debug', 'connect', 'all', 'kill-connect']);
