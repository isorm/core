import { APP_DATA } from "../core/defaults";
import { DatasetSchemaType } from "../types";

export class AppMetadata {
  static set<T>(target: { new (): unknown }, dataset: DatasetSchemaType<T>) {
    let data = Reflect.getMetadata(APP_DATA, target) || {};

    data = {
      ...data,
      ...dataset,
    };

    Reflect.defineMetadata(APP_DATA, data, target);
  }

  static get(target: { new (): unknown }) {
    return Reflect.getMetadata(APP_DATA, target);
  }
}
