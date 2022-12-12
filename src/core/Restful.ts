import { restDecorHandler } from "../libs/restDecorHandler";

export const Get =
  (path?: string) =>
  (target: any, propKey: string, descriptor: PropertyDescriptor) => {
    restDecorHandler({
      method: "GET",
      propKey,
      descriptor,
      path,
      target,
    });
  };

export const Post =
  (path?: string) =>
  (target: any, propKey: string, descriptor: PropertyDescriptor) => {
    restDecorHandler({
      method: "POST",
      propKey,
      descriptor,
      path,
      target,
    });
  };

export const Put =
  (path?: string) =>
  (target: any, propKey: string, descriptor: PropertyDescriptor) => {
    restDecorHandler({
      method: "PUT",
      propKey,
      descriptor,
      path,
      target,
    });
  };

export const Patch =
  (path?: string) =>
  (target: any, propKey: string, descriptor: PropertyDescriptor) => {
    restDecorHandler({
      method: "PATCH",
      propKey,
      descriptor,
      path,
      target,
    });
  };

export const Delete =
  (path?: string) =>
  (target: any, propKey: string, descriptor: PropertyDescriptor) => {
    restDecorHandler({
      method: "DELETE",
      propKey,
      descriptor,
      path,
      target,
    });
  };
