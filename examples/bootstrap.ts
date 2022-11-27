import bodyParser from "body-parser";
import Isorm from "../src/core/isorm";
import AppController from "./components/app/app.controller";

Isorm({
  controllers: [AppController],
  modules: [bodyParser.json({})],
});
