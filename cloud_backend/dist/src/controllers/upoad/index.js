"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadController = void 0;
const express_1 = require("express");
const lib_1 = require("../../lib");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript',
    mp4: 'video/mp4'
};
router
    .post('/', upload.single('file'), async (req, res) => {
    await (0, lib_1.makeResponse)(res, 200, true, "Files uploaded successfully");
});
router
    .get('/test', async (req, res) => {
    const filePath = path_1.default.join(__dirname, '../../../', 'uploads/', 'abc.mp4');
    res.download(filePath, "downloaded-book.png", (err) => {
        if (err && err.message.trim() !== "Request aborted") {
            res.send({
                error: err,
                msg: "Problem downloading the file"
            });
        }
    });
});
exports.uploadController = router;
