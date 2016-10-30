'use strict';

var argv = require('yargs').argv;
var path = require('path');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var mocha = require('gulp-spawn-mocha');

var SRC_FOLDER = argv.single ? singleRule(argv.single) : 'src/**/*.ts';
var TEST_FOLDER = argv.single ? singleTest(argv.single) : 'dist/test/**/*.js';
var DEF_FOLDER = 'typings/**/*.ts'
var tsProject = ts.createProject('tsconfig.json');

gulp.task('readme', ['build'], (gulpCallBack) => {
  var readme = require('./dist/readme');
  readme.updateRuleFiles(() => {
    readme.updateReadme(() => {
      gulpCallBack();
    });
  });
});

gulp.task('fetch', ['build'], function () {
  var fetch = require('./dist/readme/fetch');
  fetch.compareToESLint();
  fetch.compareToTSLint();
});

gulp.task('lint', function lint() {
  return gulp
    .src(SRC_FOLDER)
    .pipe(tslint({
      tslint: require('tslint')
    }))
    .pipe(tslint.report('prose', {
      summarizeFailureOutput: false
    }));
});

gulp.task('build', argv.lint === false ? [] : ['lint'], function build() {
  var tsResult = tsProject
    .src([SRC_FOLDER, DEF_FOLDER])
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write({
      includeContent: false,
      sourceRoot: path.join(__dirname, '/src')
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', ['build'], function test() {
  return gulp
    .src(TEST_FOLDER)
    .pipe(mocha());
});

gulp.task('watch', function watch() {
  gulp.watch(SRC_FOLDER, ['build']);
});

gulp.task('default', ['watch']);

gulp.task('publish', function build() {
  return tsProject
    .src([SRC_FOLDER, DEF_FOLDER])
    .pipe(tsProject());
});

// ---
function toCamelCase(str){
  return str.replace(/-(.)/g, function (_, char) {
    return char.toUpperCase();
  });
}

function singleRule(name) {
  return 'src/**/?(' + toCamelCase(name) + '*|helper).ts';
}

function singleTest(name) {
  return 'dist/test/rules/' + toCamelCase(name) + 'RuleTests.js';
}
