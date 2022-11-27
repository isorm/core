import bodyParser from "body-parser";
import Isorm from "../src/core/isorm";
import AppController from "./components/app/app.controller";
import BarController from "./components/bar/bar.controller";

Isorm({
  controllers: [AppController, BarController],
  modules: [bodyParser.json({})],
});
