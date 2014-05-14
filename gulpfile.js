var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    myth = require('gulp-myth');

gulp.task('default', ['js', 'lint', 'css', 'connect'], function () {
  var jsWatcher = gulp.watch('src/**/*.js', ['js', 'lint']);
  var cssWatcher = gulp.watch('src/**/*.css', ['css']);

  function changeNotification(event) {
    console.log('File', event.path, 'was', event.type, ', running tasks...');
  }

  jsWatcher.on('change', changeNotification);
  cssWatcher.on('change', changeNotification);
});

gulp.task('lint', function () {
  gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('js', function () {
  gulp.src('src/js/**/*.js')
    .pipe(concat('ng-dropdown.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename('ng-dropdown.min.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('css', function () {
  return gulp.src('src/css/**/*.css')
    .pipe(myth())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  gulp.watch(['public/**/*', 'index.html'], function() {
    gulp.src(['public/**/*', 'index.html'])
      .pipe(connect.reload());
  });

  connect.server({
    livereload: true
  });
});
