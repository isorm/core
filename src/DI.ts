import "reflect-metadata";

type ClassType = { new (...args: unknown[]): unknown };

export class Container {
  private static INJECTIONS = Symbol("INJECTIONS");

  static resolve<T>(target: ClassType): T {
    const instance = Reflect.getOwnMetadata(this.INJECTIONS, target) || {};
    return instance.target as T;
  }
  static Injectable(target: ClassType) {
    let paramTypes = Reflect.getMetadata("design:paramtypes", target) || [];
    paramTypes = paramTypes.map((item: unknown) =>
      Container.resolve(item as ClassType),
    );

    const instance = new target(...paramTypes);
    Reflect.defineMetadata(
      this.INJECTIONS,
      { target: instance, name: target.name },
      target,
    );
  }
}

export const Injectable = (target: unknown) =>
  Container.Injectable(target as ClassType);
