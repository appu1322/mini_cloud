"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseLoader = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('debug', false);
mongoose_1.default.set('strictQuery', false);
const databaseLoader = async () => new Promise(async (resolve, reject) => {
    try {
        const db = await mongoose_1.default.connect(String(process.env.MONGO_URI));
        console.log('Database connection established');
        resolve(db);
    }
    catch (err) {
        reject(err);
    }
});
exports.databaseLoader = databaseLoader;
