"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResponse = void 0;
const makeResponse = async (res, statusCode, success, message, payload = undefined, meta = {}) => new Promise(resolve => {
    res.status(statusCode)
        .send({
        success,
        message,
        data: payload,
        meta
    });
    resolve(statusCode);
});
exports.makeResponse = makeResponse;
