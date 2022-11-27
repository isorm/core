export type ClassType = { new (...args: unknown[]): unknown };
export type MethodRouteObject = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endpoint: string;
  constructor: any;
  props: { index: number; type: string; attach: any }[];
  constructorMethod: any;
  constructorMethodName: any;
};
