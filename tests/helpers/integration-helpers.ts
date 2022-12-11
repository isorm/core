import express from "express";
import { Isorm } from "../../src/isorm-core";
import { TestController } from "./controllers-helpers";

export class IntegrationHelpers {
  private static appInstance: express.Application;

  public static getApp() {
    if (this.appInstance) return this.appInstance;

    const app = Isorm({
      controllers: [TestController],
    });

    this.appInstance = app;

    return this.appInstance;
  }
}
