import { MethodRouteObject } from "../../typings";
import { Container } from "./DI";
import { AppMetadata } from "./metadata";

export const restDecorHandler = ({
  target,
  method,
  path,
  propKey,
  descriptor,
}: {
  propKey: string;
  path?: string;
  target: any;
  method: MethodRouteObject["method"];
  descriptor: PropertyDescriptor;
}) => {
  const cls = AppMetadata.get(target.constructor);

  const route = (cls?.route || []) as MethodRouteObject[];

  const methodIndex = route.findIndex(
    (item) => item.constructorMethodName === target.name,
  );

  if (methodIndex === -1) {
    route.push({
      method,
      endpoint: path || "/",
      constructor: target,
      constructorMethod: target,
      constructorMethodName: propKey,
      modules: [],
      props: [],
    });
  } else
    route[methodIndex] = {
      ...route[methodIndex],
      constructorMethod: target,
      constructorMethodName: propKey,
      modules: [],
      method,
      endpoint: path || "/",
    };

  AppMetadata.set(target.constructor, {
    route,
  });

  const dsc = descriptor.value!;

  descriptor.value = (...data: any[]) => {
    const instance = Container.resolve(target.constructor);

    let i: string;
    for (i in route[methodIndex].props) {
      const item = route[methodIndex].props[i];
      const index = data.findIndex((_, index) => index === item.index);
      if (index === -1) continue;
      data[Number(index)] = item.attach;
    }

    return dsc.apply(instance, data);
  };
};
