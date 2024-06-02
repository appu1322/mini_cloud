"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactController = void 0;
const express_1 = require("express");
const lib_1 = require("../../lib");
const middlewares_1 = require("../../middlewares");
const services_1 = require("../../services");
const router = (0, express_1.Router)();
router
    .post('/', middlewares_1.addContactValidation, async (req, res) => {
    const { contact } = req.body;
    const search = {
        'contact.email': contact.email,
        'contact.mobileNumber.number': contact.mobileNumber.number
    };
    try {
        contact.email;
        const exist = await (0, services_1.getContact)(search);
        if (exist) {
            return (0, lib_1.makeResponse)(res, 400, false, 'User already exits', undefined);
        }
        const result = await (0, services_1.addContact)(req.body);
        await (0, lib_1.makeResponse)(res, 200, true, "User created successfully", result);
    }
    catch (error) {
        await (0, lib_1.makeResponse)(res, 400, false, error.message, undefined);
    }
})
    .put('/', middlewares_1.updateContactValidation, async (req, res) => {
    const { _id, ...payload } = req.body;
    try {
        if (payload?.contact) {
            const isExist = await (0, services_1.getContact)({
                _id: { $ne: _id },
                'contact.email': payload.contact.email,
                'contact.mobileNumber.number': payload?.contact?.mobileNumber.number,
            });
            if (isExist) {
                return (0, lib_1.makeResponse)(res, 400, true, 'User already exits');
            }
        }
        const result = await (0, services_1.updateContact)({ _id }, payload, { new: true });
        await (0, lib_1.makeResponse)(res, 200, true, 'User updated successfully', result);
    }
    catch (error) {
        await (0, lib_1.makeResponse)(res, 400, false, error.message, undefined);
    }
})
    .get('/', (req, res) => {
    const { _id } = req.query;
    if (!_id) {
        return (0, lib_1.makeResponse)(res, 400, false, "_id is required", undefined);
    }
    (0, services_1.getContact)({ _id, isDeleted: false })
        .then(async (result) => {
        await (0, lib_1.makeResponse)(res, 200, true, "User fetched successfully", result);
    })
        .catch(async (error) => {
        await (0, lib_1.makeResponse)(res, 400, false, error.message, undefined);
    });
})
    .delete('/', (req, res) => {
    const { _ids } = req.body;
    if (!_ids || !_ids?.length) {
        return (0, lib_1.makeResponse)(res, 400, false, "_id is required", undefined);
    }
    (0, services_1.updateContacts)({ _id: { $in: _ids } }, { isDeleted: true }, { new: true })
        .then(async (result) => {
        await (0, lib_1.makeResponse)(res, 200, true, "User deleted successfully", result);
    })
        .catch(async (error) => {
        await (0, lib_1.makeResponse)(res, 400, false, error.message, undefined);
    });
});
router
    .get('/list', async (req, res) => {
    const query = req.query;
    const searchQuery = query.search ? { isDeleted: false, $or: [] } : { isDeleted: false };
    const keys = Object.keys(query);
    keys.map((key) => {
        switch (key) {
            case 'search':
                const regx = new RegExp(query.search ? query.search?.trim() : '' + '$', 'i');
                if (searchQuery.$or) {
                    searchQuery.$or.push({ name: regx });
                }
                break;
            default:
                break;
        }
    });
    try {
        if (query.pagination && query.pagination === 'true') {
            let page = 1;
            let limit = 20;
            let skip = 0;
            if (query.page) {
                page = Number(query.page);
            }
            if (query.limit) {
                limit = Number(query.limit);
            }
            skip = (page - 1) * limit;
            const documentsCount = await (0, services_1.getContactsCount)(searchQuery);
            const data = await (0, services_1.getContactsWithPagination)(searchQuery, { __v: 0 }, { skip, limit });
            await (0, lib_1.makeResponse)(res, 200, true, "User fetched successfully", data, {
                page,
                totalPages: Math.ceil(documentsCount / limit),
                totalRecords: documentsCount
            });
        }
        else {
            const data = await (0, services_1.getContacts)(searchQuery, { __v: 0 });
            await (0, lib_1.makeResponse)(res, 200, true, "User fetched successfully", data);
        }
    }
    catch (error) {
        await (0, lib_1.makeResponse)(res, 400, false, error.message, undefined);
    }
});
router
    .get('/text', async (req, res) => {
    await (0, lib_1.makeResponse)(res, 200, true, "User fetched successfully", {
        qwerty: process.env.USER
    });
});
exports.contactController = router;
