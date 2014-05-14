var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect');

gulp.task('default', ['js', 'lint', 'connect'], function () {
  var watcher = gulp.watch('src/**/*.js', ['js', 'lint']);
  watcher.on('change', function(event) {
    console.log('File', event.path, 'was', event.type, ', running tasks...');
  });
});

gulp.task('lint', function () {
  gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('js', function () {
  gulp.src('src/**/*.js')
    .pipe(concat('ng-dropdown.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('ng-dropdown.min.js'))
    .pipe(gulp.dest('dist'));
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
