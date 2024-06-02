"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appLoader = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const morgan_1 = __importDefault(require("morgan"));
const PORT = Number(process.env.PORT) || 3000;
const HOST = String(process.env.HOST || '0.0.0.0');
const appLoader = async (app, router) => new Promise(resolve => {
    const server = (0, http_1.createServer)(app);
    app.use((0, cors_1.default)({
        origin: true
    }));
    app.use(express_1.default.json({
        limit: '10mb'
    }));
    app.use(express_1.default.urlencoded({
        extended: true
    }));
    app.use((0, morgan_1.default)('dev'));
    app.use('/api', router);
    app.use((req, res) => {
        res.status(404)
            .send({
            success: false,
            data: undefined,
            message: 'the resource you are looking for is not found.'
        });
    });
    server.listen(PORT, HOST, async () => {
        console.log(`* App is running at PORT: ${PORT} *`);
        resolve(true);
    });
});
exports.appLoader = appLoader;
