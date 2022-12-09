import { NextFunction, Request, Response } from "express";
import { Express } from "express";

export type ClassType = { new (...args: unknown[]): unknown };

export type MethodRouteObject = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endpoint: string;
  constructor: any;
  args: [Request, Response, NextFunction] | [];
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

export type ModuleType = (
  req: Request,
  res: Response,
  next: NextFunction,
) => NextFunction | void;

export type PackageType = (app: Express) => void;

export type DatasetSchemaType<T> = Partial<{
  path: string;
  instance: T;
  route: MethodRouteObject[];
  modules: ModuleType[];
}>;

export type IsormType = {
  controllers: { new (...args: any): unknown }[];
  modules?: ModuleType[];
  packages?: PackageType[];
  configs?: Partial<{
    port: number; // default : 3000
    autolisten: boolean; // default : true
  }>;
};
