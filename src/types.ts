import { NextFunction, Request, Response } from "express";
import { Express } from "express";

export type ClassType = { new (...args: unknown[]): unknown };

export type MethodDecorWrapperOptionsType = Partial<{
  type?: "MODULE";
}>;

export type ModuleType = (
  req: Request,
  res: Response,
  next: NextFunction,
) => NextFunction | void;

export type MiddlewareType = (
  args: Partial<{ [K in "props" | "pass"]: any }>,
  req: Request,
  res: Response,
  next: NextFunction,
) => any;

export type PackageType = (app: Express) => void;

export type MethodRouteObject = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endpoint: string;
  constructor: any;
  args: [Request, Response, NextFunction] | [];
  props: { index: number; type: string; attach: any }[];
  constructorMethod: any;
  constructorMethodName: any;
  modules: ((req: Request, res: Response, next?: NextFunction) => unknown)[];
  after?: MiddlewareType[];
};

export type MethodDecorWrapperType = {
  target: string;
  key: string | undefined;
  descriptor: PropertyDescriptor;
  _: { route: MethodRouteObject[]; metadata: Symbol };
};

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
    indexHTMLPath: string; // default ./public/index.html
  }>;
};

export namespace IS {
  export type ReactPage<T = {}> = Partial<{
    children: React.ReactNode;
  }> & {
    $query: { params: { name: string; value: string }[]; all: string };
    $params: { [K in string]: K };
  } & { [K in keyof T]: T[K] };

  export type ReactRouter = {
    pages: React.FC<any>[];
  };
}

export namespace EventBusNS {
  export type Subscribe = {
    [key: string]: { fn: Function; pubId: number }[];
  };

  export type Router = Map<string, Subscribe>;
}
