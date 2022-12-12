import { AppMetadata } from "../libs/metadata";
import { MiddlewareType, ModuleType } from "../types";

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

export const After =
  (...afters: MiddlewareType[]) =>
  (target: any, key: string, descriptor: PropertyDescriptor) => {
    const _ = AppMetadata.get(target.constructor);

    const routeIndex = _.route.findIndex(
      (item: any) => item.constructorMethodName === key,
    );

    _.route[routeIndex].after.push(...afters);
    AppMetadata.set(target, _);
  };
