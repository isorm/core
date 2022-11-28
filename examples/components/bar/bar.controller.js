"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isorm_core_1 = require("../../../src/isorm-core");
var bar_service_1 = __importDefault(require("./bar.service"));
var BarController = /** @class */ (function () {
    function BarController(service) {
        this.service = service;
    }
    BarController.prototype.getBar = function (res) {
        res.send(this.service.sayHello()).status(200);
    };
    __decorate([
        (0, isorm_core_1.Get)(),
        __param(0, isorm_core_1.Res),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BarController.prototype, "getBar", null);
    BarController = __decorate([
        (0, isorm_core_1.Controller)("/bar"),
        __metadata("design:paramtypes", [bar_service_1.default])
    ], BarController);
    return BarController;
}());
exports.default = BarController;
