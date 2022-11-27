import "jest";
import { Application } from "express";
import { IntegrationHelpers } from "../helpers/integration-helpers";
import request from "supertest";

describe("app tests", () => {
  let app: Application;

  beforeAll(() => {
    app = IntegrationHelpers.getApp();
  });

  it("get app status", async () => {
    await request(app).get("/").expect(200);
  });
});
