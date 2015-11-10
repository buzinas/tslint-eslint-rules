'use strict';

const gulp = require('gulp');
const ts = require('gulp-typescript');
const mocha = require('gulp-spawn-mocha');

const SRC_FOLDER = 'src/**/*.ts';

gulp.task('build', function build() {
  return gulp
    .src(SRC_FOLDER)
    .pipe(ts({
      'module': 'CommonJS'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', ['build'], function test() {
  return gulp
    .src('dist/test/**/*.js')
    .pipe(mocha());
});

gulp.task('watch', function watch() {
  gulp.watch(SRC_FOLDER, ['build', 'test']);  
});

gulp.task('default', ['build', 'test', 'watch']);
