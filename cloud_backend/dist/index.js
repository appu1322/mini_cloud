"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv')
    .config();
const express_1 = __importDefault(require("express"));
const app_1 = require("./src/loaders/app");
const database_1 = require("./src/loaders/database");
const routers_1 = require("./src/routers");
process.on('uncaughtException', err => {
    console.log(' UNCAUGHT EXCEPTION ');
    console.log('[Inside \'uncaughtException\' event] ' + err.stack || err.message);
});
process.on('unhandledRejection', (reason, promise) => {
    console.log(' UNHANDLED REJECTION ');
    console.log('Unhandled Rejection at: ', promise, 'REASON: ', reason);
});
const app = (0, express_1.default)();
(0, database_1.databaseLoader)()
    .then(() => (0, app_1.appLoader)(app, routers_1.router))
    .catch(error => {
    console.log(error);
    process.exit(1);
});
