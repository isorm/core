import { Injectable } from "../../../src/isorm-core";

@Injectable
class AppService {
  sayHello() {
    return "Hello world";
  }
}

export default AppService;
