"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactsCount = exports.getContactsWithPagination = exports.updateContacts = exports.updateContact = exports.getContacts = exports.getContact = exports.addContact = void 0;
const models_1 = require("../../models");
const addContact = async (payload) => models_1.CONTACT.create(payload);
exports.addContact = addContact;
const getContact = async (search = {}, project = {}) => models_1.CONTACT.findOne(search, project)
    .sort({ _id: -1 })
    .lean()
    .exec();
exports.getContact = getContact;
const getContacts = async (search = {}, project = {}) => models_1.CONTACT.find(search, project)
    .sort({ _id: -1 })
    .lean()
    .exec();
exports.getContacts = getContacts;
const updateContact = async (search = {}, payload = {}, optional = {}) => models_1.CONTACT.findOneAndUpdate(search, payload, optional)
    .lean()
    .exec();
exports.updateContact = updateContact;
const updateContacts = async (search = {}, payload = {}, optional = {}) => models_1.CONTACT.updateMany(search, payload, optional)
    .lean()
    .exec();
exports.updateContacts = updateContacts;
const getContactsWithPagination = async (search = {}, project = {}, optional) => models_1.CONTACT.find(search, project)
    .sort({ _id: -1 })
    .skip(optional.skip)
    .limit(optional.limit)
    .lean()
    .exec();
exports.getContactsWithPagination = getContactsWithPagination;
const getContactsCount = async (search = {}) => new Promise((resolve, reject) => {
    models_1.CONTACT.countDocuments(search)
        .then(resolve)
        .catch(reject);
});
exports.getContactsCount = getContactsCount;
