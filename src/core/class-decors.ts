import { ModuleType } from "../../typings";
import { Container } from "../libs/DI";
import { AppMetadata } from "../libs/metadata";

export const Controller = (path?: string) => (target: any) => {
  Container.resolve(target, path);
};

export const Module =
  (...modules: ModuleType[]) =>
  (target: any) => {
    const dataset = AppMetadata.get(target);

    dataset.modules.push(...modules);

    AppMetadata.set(target, dataset);
  };
