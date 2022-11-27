import { Response } from "express";
import { Controller, Get, Res } from "../../../src/isorm-core";
import BarService from "./bar.service";

@Controller("/bar")
class BarController {
  constructor(private service: BarService) {}

  @Get()
  getBar(@Res res: Response) {
    res.send(this.service.sayHello()).status(200);
  }
}

export default BarController;
