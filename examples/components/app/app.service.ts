import { Injectable } from "../../../src/isorm-core";

@Injectable
class AppService {
  sayHello() {
    return "Hello";
  }
}

export default AppService;
