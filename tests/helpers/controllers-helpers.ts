import { TestService } from "./services-helpers";
import { Request, Response } from "express";
import { Controller, Get, Render, Req, Res } from "../../src/isorm-core";

@Controller("/")
export class TestController {
  constructor(private service: TestService) {}

  @Get("/")
  setSay(@Req req: Request, @Res res: Response) {
    return res.json({ ok: true });
  }

  @Render(() => {})
  @Get("/test")
  test1(@Req req: Request) {
    return { props: { data: [{ foo: `Hello world from ${req.url}` }] } };
  }
}
