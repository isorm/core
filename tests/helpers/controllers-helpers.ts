import { Get } from "../../src/core/Restful";
import { Controller } from "../../src/core/class-decorators";
import { TestService } from "./services-helpers";
import { Request } from "express";
import { Req } from "../../src/core/prop-decorator";

@Controller("/")
export class TestController {
  constructor(private service: TestService) {}

  @Get("/")
  setSay(@Req req: Request) {
    return `${this.service.foo()},${req.baseUrl}`;
  }
}
