import { Injectable } from "../../../src/isorm-core";

@Injectable
class BarService {
  sayHello() {
    return "Hello From Bar";
  }
}

export default BarService;
