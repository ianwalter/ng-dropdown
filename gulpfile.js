var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    karma = require('gulp-karma'),
    connect = require('gulp-connect'),
    myth = require('gulp-myth'),
    minifyCSS = require('gulp-minify-css'),
    debug = false,
    WATCH_MODE = 'watch',
    RUN_MODE = 'run';

var mode = WATCH_MODE;

gulp.task('lint', function () {
  gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
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

gulp.task('js', function() {
  var jsTask = gulp
    .src('src/js/**/*.js')
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

gulp.task('kill-connect', ['protractor'], function() {
  connect.serverClose();
});

gulp.task('run-mode', function() {
  mode = RUN_MODE;
});

gulp.task('debug', function() {
  debug = true;
});

function changeNotification(event) {
  console.log('File', event.path, 'was', event.type, ', running tasks...');
}

function watch() {
  var jsWatcher = gulp.watch('src/js/**/*.js', ['js', 'lint']),
      cssWatcher = gulp.watch('src/css/**/*.css', ['css']);

  jsWatcher.on('change', changeNotification);
  cssWatcher.on('change', changeNotification);
}

gulp.task('all', ['css', 'js', 'lint']);

gulp.task('default', ['all'], watch);

gulp.task('server', ['connect', 'default']);

gulp.task('test', ['run-mode', 'debug', 'connect', 'all', 'kill-connect']);
