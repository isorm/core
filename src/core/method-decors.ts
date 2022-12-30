import { Container } from "../isorm-core";
import EventBus from "../libs/EventBus";
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

export const Intract =
  <E extends string, R extends string, T>(
    event: E,
    routeKey: R,
    callback?: (...data: T[]) => T[] | void,
  ) =>
  (target: any, key: string, descriptor: PropertyDescriptor) => {
    EventBus.subscribe(event, routeKey, (...data: T[]) => {
      const dt = Container.resolve<any>(target.constructor);

      let cbResponse = null;

      if (callback) cbResponse = callback(...data);

      const args = cbResponse ?? data;

      return dt[key](...args);
    });
  };
