// Unable to find this declaration in https://github.com/DefinitelyTyped/DefinitelyTyped/
// Writing using the definition from gulp-mocha

declare module "gulp-spawn-mocha" {
  function mocha(setupOptions?: MochaSetupOptions): NodeJS.ReadWriteStream;
  namespace mocha {}
  export = mocha;
}
