import { Get } from "../../src/core/Restful";
import { Controller } from "../core/class-decors";
import { TestService } from "./services-helpers";
import { Request } from "express";
import { Req } from "../core/prop-decors";

@Controller("/")
export class TestController {
  constructor(private service: TestService) {}

  @Get("/")
  setSay(@Req req: Request) {
    return `${this.service.foo()},${req.baseUrl}`;
  }
}
