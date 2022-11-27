import { Container } from "../libs/DI";

export const Controller = (path?: string) => (target: any) => {
  Container.resolve(target, path);
};
