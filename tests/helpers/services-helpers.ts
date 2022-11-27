import { Injectable } from "../../src/libs/DI";

@Injectable
export class TestService {
  foo() {
    return "Hello world";
  }
}
