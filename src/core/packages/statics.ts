import express from "express";
import { join } from "path";
import { cwd } from "process";

export const statics =
  (...paths: string[]) =>
  (app: express.Express) =>
    app.use(paths.map((path) => express.static(join(cwd(), path))));
