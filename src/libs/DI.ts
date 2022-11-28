import "reflect-metadata";
import { ClassType, INJECTIONS } from "../isorm-core";
import { AppMetadata } from "./metadata";

export class Container {
  static resolve<T>(target: ClassType, path?: string): T {
    const instance = Reflect.getMetadata("design:paramtypes", target) || [];

    const injections = instance.map((injects: any) =>
      Container.resolve<any>(injects),
    ) as any;
    const cls = new target(...injections) as T;

    AppMetadata.set(target, { path: path || "/", instance: cls, modules: [] });

    return cls;
  }

  static get(target: ClassType) {
    const instance = Reflect.getOwnMetadata(INJECTIONS, target) as ClassType;
    return instance;
  }

  static Injectable(target: ClassType) {
    let paramTypes = Reflect.getMetadata("design:paramtypes", target) || [];
    paramTypes = paramTypes.map((item: unknown) =>
      Container.resolve(item as ClassType),
    );

    const instance = new target(...paramTypes);
    Reflect.defineMetadata(
      INJECTIONS,
      { target: instance, name: target.name },
      target,
    );
  }
}

export const Injectable = (target: unknown) =>
  Container.Injectable(target as ClassType);
