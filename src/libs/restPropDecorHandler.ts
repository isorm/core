import { MethodRouteObject } from "../types";
import { AppMetadata } from "./metadata";

export const restPropDecorHandler = ({
  propType,
  target,
  paramIndex,
}: {
  propType: string;
  paramIndex: number;
  target: any;
}) => {
  const cls = AppMetadata.get(target.constructor);

  const route = (cls?.route || []) as MethodRouteObject[];

  const methodIndex = route.findIndex(
    (item) => item.constructorMethodName === target.name,
  );

  const prop = { index: paramIndex, type: propType, attach: {} };

  if (methodIndex === -1)
    route.push({
      constructor: target.constructor,
      props: [prop],
    } as any);
  else route[methodIndex].props.push(prop);

  AppMetadata.set(target.constructor, {
    route,
  });
};
