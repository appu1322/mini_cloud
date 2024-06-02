"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContactValidation = exports.addContactValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const lib_1 = require("../../../lib");
const addContactValidation = (req, res, next) => {
    const activity = joi_1.default.object({
        firstName: joi_1.default.string()
            .required(),
        gender: joi_1.default.string()
            .valid('MALE', 'FEMALE', 'TRANSGENDER')
            .required(),
        contact: joi_1.default.object()
            .keys({
            email: joi_1.default.string().required(),
            mobileNumber: joi_1.default.object()
                .keys({
                dialCode: joi_1.default.string(),
                iso2: joi_1.default.string().max(2),
                country: joi_1.default.string(),
                number: joi_1.default.string(),
            })
                .required()
        })
            .required()
    });
    const { error } = activity.validate(req.body);
    if (error) {
        return (0, lib_1.makeResponse)(res, 400, false, error.message);
    }
    next();
};
exports.addContactValidation = addContactValidation;
const updateContactValidation = (req, res, next) => {
    const activity = joi_1.default.object({
        _id: joi_1.default.string()
            .required(),
        firstName: joi_1.default.string()
            .allow('')
            .optional(),
        gender: joi_1.default.string()
            .valid('MALE', 'FEMALE', 'TRANSGENDER')
            .allow('')
            .optional(),
        contact: joi_1.default.object()
            .keys({
            email: joi_1.default.string()
                .allow('')
                .optional(),
            mobileNumber: joi_1.default.object()
                .keys({
                dialCode: joi_1.default.string(),
                iso2: joi_1.default.string().max(2),
                country: joi_1.default.string(),
                number: joi_1.default.string(),
            })
                .optional()
        })
            .allow('')
            .optional()
    });
    const { error } = activity.validate(req.body);
    if (error) {
        return (0, lib_1.makeResponse)(res, 400, false, error.message);
    }
    next();
};
exports.updateContactValidation = updateContactValidation;
