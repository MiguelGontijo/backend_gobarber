"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
require("express-async-errors");
var index_1 = __importDefault(require("./routes/index"));
var upload_1 = __importDefault(require("./config/upload"));
var AppError_1 = __importDefault(require("./errors/AppError"));
require("./database");
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/files', express_1.default.static(upload_1.default.directory));
app.use(index_1.default);
app.use(function (err, request, response, next) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
app.listen('3333', function () {
    console.log('🚀 server started on port 3333');
});
