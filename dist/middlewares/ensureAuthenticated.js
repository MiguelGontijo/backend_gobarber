"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../config/auth"));
var AppError_1 = __importDefault(require("../errors/AppError"));
function ensureAuthenticated(request, response, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default('JWT token is missing');
    }
    /* desestruturação do array quando só preciso da segunda posição
    do array informo apenas ele após a virgula que é a segunda posição
    do array */
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decoded = jsonwebtoken_1.verify(token, auth_1.default.JWT.secret);
        // para forçar a tipagem de decoded usamos o as
        var sub = decoded.sub;
        // #override forçar tipagem com um esquema pra sobreescrever uma tipagem de uma biblioteca
        request.user = {
            id: sub,
        };
        return next();
    }
    catch (_b) {
        throw new AppError_1.default('Invalid JWT token');
    }
}
exports.default = ensureAuthenticated;
