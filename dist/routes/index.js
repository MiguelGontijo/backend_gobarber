"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var appointment_routes_1 = __importDefault(require("./appointment.routes"));
var user_routes_1 = __importDefault(require("./user.routes"));
var sessions_routes_1 = __importDefault(require("./sessions.routes"));
var routes = express_1.default();
routes.use('/appointments', appointment_routes_1.default);
routes.use('/users', user_routes_1.default);
routes.use('/sessions', sessions_routes_1.default);
exports.default = routes;
