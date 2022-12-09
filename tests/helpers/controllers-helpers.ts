import { TestService } from "./services-helpers";
import { Request } from "express";
import { Controller, Get, Req } from "../../src/isorm-core";

@Controller("/")
export class TestController {
  constructor(private service: TestService) {}

  @Get("/")
  setSay(@Req req: Request) {
    return `${this.service.foo()},${req.baseUrl}`;
  }
}
