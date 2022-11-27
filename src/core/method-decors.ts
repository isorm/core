import { NextFunction, Request, Response } from "express";
import { AppMetadata } from "../libs/metadata";

export const Use =
  (
    ...modules: ((
      req: Request,
      res: Response,
      next: NextFunction,
    ) => NextFunction | void)[]
  ) =>
  (target: any, key: string, descriptor: PropertyDescriptor) => {
    const _ = AppMetadata.get(target.constructor);

    const routeIndex = _.route.findIndex(
      (item: any) => item.constructorMethodName === key,
    );

    _.route[routeIndex].modules.push(...modules);
    AppMetadata.set(target, _);
  };
