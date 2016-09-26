import { Gulpclass, Task } from 'gulpclass/Decorators';
import { argv } from 'yargs';
import * as path from 'path';
import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import * as tslint from 'gulp-tslint';
import * as sourcemaps from 'gulp-sourcemaps';
import * as mocha from 'gulp-spawn-mocha';

function toCamelCase(str) {
  const words = str.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  words[0] = words[0].toLowerCase();
  return words.join('');
}

function singleRule(name) {
  return `src/**/?(${toCamelCase(name)}*|helper).ts`;
}

function singleTest(name) {
  return `dist/test/rules/${toCamelCase(name)}RuleTests.js`;
}

@Gulpclass()
export class Gulpfile {
  public static DEF_FOLDER = 'typings/**/*.ts';
  public static TS_CONFIG = ts.createProject('tsconfig.json');
  public static SRC_FOLDER = argv.single ? singleRule(argv.single) : 'src/**/*.ts';
  public static TEST_FOLDER = argv.single ? singleTest(argv.single) : 'dist/test/**/*.js';

  @Task('default', ['watch'])
  public defaultTask() {
    return this;
  }

  @Task('readme', ['build'])
  public readme(gulpCallBack: Function) {
    // The module './dist/readme' will be available after the `build` task
    const readme = require('./dist/readme');
    readme.updateRuleFiles();
    readme.updateReadme();
    gulpCallBack();
  }

  @Task('lint')
  public lint() {
    return gulp
      .src(Gulpfile.SRC_FOLDER)
      .pipe(tslint({
        tslint: require('tslint')
      }))
      .pipe(tslint.report('prose', {
        summarizeFailureOutput: false
      }));
  }

  @Task('build', argv.lint === false ? [] : ['lint'])
  public build() {
    return gulp
      .src([
        Gulpfile.SRC_FOLDER,
        Gulpfile.DEF_FOLDER,
        'node_modules/typescript/lib/lib.es6.d.ts'
      ])
      .pipe(sourcemaps.init())
      .pipe(ts(Gulpfile.TS_CONFIG))
      .pipe(sourcemaps.write({
        includeContent: false,
        sourceRoot: path.join(__dirname, '/src')
      }))
      .pipe(gulp.dest('dist'));
  }

  @Task('test', ['build'])
  public test() {
    return gulp
      .src(Gulpfile.TEST_FOLDER)
      .pipe(mocha());
  }

  @Task('watch')
  public watch() {
    gulp.watch(Gulpfile.SRC_FOLDER, ['build']);
  }

  @Task('publish')
  public publish() {
    return gulp
      .src([
        Gulpfile.SRC_FOLDER,
        Gulpfile.DEF_FOLDER,
        'node_modules/typescript/lib/lib.es6.d.ts'
      ])
      .pipe(ts(Gulpfile.TS_CONFIG))
      .pipe(gulp.dest('dist'));
  }

  @Task('fetch', ['build'])
  public fetch(gulpCallBack: Function) {
    const fetch = require('./dist/readme/fetch');
    fetch.compareToESLint();
    fetch.compareToTSLint();
    gulpCallBack();
  }
}
