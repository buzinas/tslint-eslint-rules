declare module 'doctrine' {
  namespace doctrine {
    interface Doctrine {
      parse: (jsDocComment: string, options: any) => IJSDocComment;
    }

    interface IJSDocComment {
      tags: IJSDocTag[];
      description: string;
    }

    interface IJSDocTag {
      title: string;
      name: string;
      description: string;
      type: any;
    }
  }

  var doctrine: doctrine.Doctrine;
  export = doctrine;
}
