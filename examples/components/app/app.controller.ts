import { Request, Response } from "express";
import {
  Controller,
  Get,
  methodDecorWrapper,
  Req,
  Res,
} from "../../../src/isorm-core";
import { Use } from "./app.modules";
import AppService from "./app.service";

@Controller("/app")
class AppController {
  constructor(private service: AppService) {}

  @Get("test")
  async testApp(@Res res: Response) {
    const hello = this.service.sayHello();

    return res.json({ result: `${hello} World` });
  }

  @Use()
  @Get("test:key")
  async getApp(@Res res: Response, @Req req: Request) {
    const name = req.params?.key || "";
    const hello = this.service.sayHello();

    return res.json({ result: `${hello} ${name}` });
  }
}

export default AppController;
