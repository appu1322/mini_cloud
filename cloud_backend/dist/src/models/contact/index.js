"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTACT = void 0;
const mongoose_1 = require("mongoose");
const phoneSchema = new mongoose_1.Schema({
    dialCode: String,
    iso2: {
        type: String,
        uppercase: true,
        max: 2
    },
    country: {
        type: String,
        uppercase: true
    },
    number: String
}, { _id: false });
const schema = new mongoose_1.Schema({
    firstName: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE', 'TRANSGENDER']
    },
    contact: {
        email: {
            type: String,
            lowercase: true
        },
        mobileNumber: phoneSchema
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const CONTACT = (0, mongoose_1.model)('contact', schema);
exports.CONTACT = CONTACT;
