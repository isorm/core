import { MethodDecorWrapperOptionsType } from "./../../index.d";
import { MethodDecorWrapperType } from "../../index.d";
import { AppMetadata } from "../libs/metadata";
import { APP_DATA } from "./defaults";
import { NextFunction, Request, Response } from "express";
import { Container } from "../isorm-core";

export const methodDecorWrapper = <T extends MethodDecorWrapperOptionsType>(
  cb: ({
    target,
    key,
    descriptor,
    _,
  }: MethodDecorWrapperType) => T["type"] extends "MODULE"
    ? (req: Request, res: Response, next: NextFunction) => unknown
    : unknown,
  options?: T,
) => {
  return (
    target: any,
    key: string | undefined,
    descriptor: PropertyDescriptor,
  ) => {
    const _ = AppMetadata.get(target.constructor);

    const routeIndex = _.route.findIndex(
      (item: any) => item.constructorMethodName === key,
    );

    const decorator = cb({
      target,
      key,
      descriptor,
      _: { ..._, metadata: APP_DATA },
    });

    if (options?.type === "MODULE") {
      _.route[routeIndex].modules.push(decorator);
      AppMetadata.set(target, _);
    }
  };
};
