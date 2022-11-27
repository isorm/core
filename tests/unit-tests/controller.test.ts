import "jest";
import { Controller } from "../../src/core/class-decorators";
import { Injectable } from "../../src/libs/DI";
import Isorm from "../../src/core/isorm";
import { Get } from "../../src/core/Restful";
import { Req } from "../../src/core/prop-decorator";
import { Request, Response } from "express";

describe("controller tests", () => {
  it("get status", () => {
    @Injectable
    class Service {
      main() {
        return "ok";
      }
    }

    @Controller()
    class Test {
      constructor(private service: Service) {}

      getMain() {
        const result = this.service.main();

        return result;
      }
    }

    @Controller("/auth")
    class Test1 {
      constructor(private service: Service) {}

      @Get("/okd")
      getMain(@Req req: Request) {
        const result = this.service.main();

        return req.baseUrl;
      }
    }

    Isorm({
      controllers: [Test, Test1],
    });
  });
});
