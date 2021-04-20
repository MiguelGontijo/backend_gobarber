"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appError = /** @class */ (function () {
    function appError(message, statusCode) {
        if (statusCode === void 0) { statusCode = 400; }
        this.message = message;
        this.statusCode = statusCode; // caso não seja informado será o 400
    }
    return appError;
}());
exports.default = appError;
