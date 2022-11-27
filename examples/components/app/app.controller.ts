import { Request, Response } from "express";
import { Controller, Get, Req, Res } from "../../../src/isorm-core";
import AppService from "./app.service";

@Controller("/app")
class AppController {
  constructor(private service: AppService) {}

  @Get("test:key")
  getApp(@Res res: Response, @Req req: Request) {
    console.log(req.params.key);
    const result = this.service.sayHello();

    return res.json({ result });
  }
}

export default AppController;
