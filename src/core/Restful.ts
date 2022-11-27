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
