import "jest";
import { Application } from "express";
import { IntegrationHelpers } from "../helpers/integration-helpers";
import request from "supertest";
import { describe, beforeAll, it, jest } from "@jest/globals";

jest.useRealTimers();

describe("app tests", () => {
  let app: Application;

  beforeAll(() => {
    if (!app) app = IntegrationHelpers.getApp();
  });

  it("get app status", async () => {
    const req = await request(app).get("/");

    console.log(req.body);
  }, 10000);

  it("get render decorator status", async () => {
    const req = await request(app).get("/test");

    console.log(req.body);
  }, 10000);
});
