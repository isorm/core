import { TestService } from "./services-helpers";
import { Request, Response } from "express";
import { After, Controller, Get, Render, Req, Res } from "../../src/isorm-core";

@Controller("/")
export class TestController {
  constructor(private service: TestService) {}

  @Get("/")
  setSay(@Req req: Request, @Res res: Response) {
    return res.json({ ok: true });
  }

  @After(
    (args, req, res, next) => next(args),
    (args, req, res, next) => {
      return res.json(args);
    },
  )
  @Get("/test")
  test1(@Req req: Request, @Res res: Response) {
    // return res.json({ ok1: true });
    return { props: { data: [{ foo: `Hello s from ${req.url}` }] } };
  }
}
