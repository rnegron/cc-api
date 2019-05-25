declare module '@carsondarling/mongoose-jsonapi' {
  import * as mongoose from 'mongoose';

  interface IOptions {
    name: string;
    serializer?: any;
    deserializer?: any;
    attributes?: string[];
    keyForAttributes?: string;
  }

  function serializerPlugin(schema: mongoose.Schema, options: IOptions): void;

  export = serializerPlugin;
}
