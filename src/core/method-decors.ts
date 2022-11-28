import { AppMetadata } from "../libs/metadata";
import { ModuleType } from "../types";

export const Use =
  (...modules: ModuleType[]) =>
  (target: any, key: string, descriptor: PropertyDescriptor) => {
    const _ = AppMetadata.get(target.constructor);

    const routeIndex = _.route.findIndex(
      (item: any) => item.constructorMethodName === key,
    );

    _.route[routeIndex].modules.push(...modules);
    AppMetadata.set(target, _);
  };
