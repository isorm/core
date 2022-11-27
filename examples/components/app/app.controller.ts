import { Request, Response } from "express";
import {
  Controller,
  Get,
  Module,
  Req,
  Res,
  Use,
} from "../../../src/isorm-core";
import AppService from "./app.service";

@Module((req, res, next) => {
  console.log("Running App Controller");
  return next();
})
@Controller("/app")
class AppController {
  constructor(private service: AppService) {}

  @Get("test")
  async testApp(@Res res: Response) {
    const hello = this.service.sayHello();

    return res.json({ result: `${hello} World` });
  }

  @Use((req, res, next) => {
    console.log(req.url);
    return next();
  })
  @Get("test:key")
  async getApp(@Res res: Response, @Req req: Request) {
    const name = req.params?.key || "";
    const hello = this.service.sayHello();

    return res.json({ result: `${hello} ${name}` });
  }
}

export default AppController;
