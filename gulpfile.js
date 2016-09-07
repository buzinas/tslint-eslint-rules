'use strict';

const argv = require('yargs').argv;
const path = require('path');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const mocha = require('gulp-spawn-mocha');


function toCamelCase(str){
  const words = str.split('-').map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  words[0] = words[0].toLowerCase();
  return words.join('');
}

function singleRule(name) {
  return `src/**/?(${toCamelCase(name)}*|helper).ts`;
}

function singleTest(name) {
  return `dist/test/rules/${toCamelCase(name)}RuleTests.js`;
}


const SRC_FOLDER = argv.single ? singleRule(argv.single) : 'src/**/*.ts';
const TEST_FOLDER = argv.single ? singleTest(argv.single) : 'dist/test/**/*.js';
const DEF_FOLDER = 'typings/**/*.ts'
const TS_CONFIG = ts.createProject('tsconfig.json');

gulp.task('readme', ['build'], () => {
  const readme = require('./dist/readme');
  readme.updateReadme();
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
    .src(TEST_FOLDER)
    .pipe(mocha());
});

gulp.task('watch', function watch() {
  gulp.watch(SRC_FOLDER, ['build']);
});

gulp.task('default', ['watch']);

gulp.task('publish', function build() {
  return gulp
    .src([SRC_FOLDER, DEF_FOLDER, 'node_modules/typescript/lib/lib.es6.d.ts'])
    .pipe(ts(TS_CONFIG))
    .pipe(gulp.dest('dist'));
});
