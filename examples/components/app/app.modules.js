"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Use = void 0;
var isorm_core_1 = require("../../../src/isorm-core");
var Use = function () {
    return (0, isorm_core_1.methodDecorWrapper)(function (data) {
        return function (req, res, next) {
            console.log("Runned App Module from", req.url);
            return next();
        };
    }, {
        type: "MODULE",
    });
};
exports.Use = Use;
