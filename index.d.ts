import { NextFunction, Request, Response } from "express";

export type ClassType = { new (...args: unknown[]): unknown };
export type MethodRouteObject = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endpoint: string;
  constructor: any;
  props: { index: number; type: string; attach: any }[];
  constructorMethod: any;
  constructorMethodName: any;
  modules: ((req: Request, res: Response, next?: NextFunction) => unknown)[];
};
export type MethodDecorWrapperType = {
  target: string;
  key: string | undefined;
  descriptor: PropertyDescriptor;
  _: { route: MethodRouteObject[]; metadata: Symbol };
};
export type MethodDecorWrapperOptionsType = Partial<{
  type?: "MODULE";
}>;
