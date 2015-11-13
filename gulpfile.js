'use strict';

const path = require('path');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const mocha = require('gulp-spawn-mocha');

const SRC_FOLDER = 'src/**/*.ts';
const DEF_FOLDER = 'typings/**/*.ts'
const TS_CONFIG = ts.createProject('tsconfig.json');

gulp.task('build', function build() {
  return gulp
    .src([SRC_FOLDER, DEF_FOLDER, 'node_modules/typescript/lib/lib.es6.d.ts'])
    .pipe(sourcemaps.init())
    .pipe(ts(TS_CONFIG))
    .pipe(sourcemaps.write({
      includeContent: false,
      sourceRoot: path.join(__dirname, '/src')
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

gulp.task('publish', function build() {
  return gulp
    .src([SRC_FOLDER, DEF_FOLDER, 'node_modules/typescript/lib/lib.es6.d.ts'])
    .pipe(ts(TS_CONFIG))
    .pipe(gulp.dest('dist'));
});