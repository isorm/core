"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var isorm_1 = __importDefault(require("../src/core/isorm"));
var app_controller_1 = __importDefault(require("./components/app/app.controller"));
var bar_controller_1 = __importDefault(require("./components/bar/bar.controller"));
(0, isorm_1.default)({
    controllers: [app_controller_1.default, bar_controller_1.default],
    modules: [body_parser_1.default.json({})],
});
