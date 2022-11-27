import { MethodRouteObject } from "../../index.d";
import { APP_DATA } from "../core/defaults";

export class AppMetadata {
  static set<T>(
    target: { new (): unknown },
    dataset: Partial<{
      path: string;
      instance: T;
      route: MethodRouteObject[];
    }>,
  ) {
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
