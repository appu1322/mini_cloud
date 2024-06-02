import { Types } from 'mongoose';
import { CONTACT } from '../../models';

const addContact = async (payload: any) =>
  CONTACT.create(payload);

const getContact = async (search = {}, project = {}) =>
  CONTACT.findOne(search, project)
    .sort({ _id: -1 })
    .lean()
    .exec();

const getContacts = async (search = {}, project = {}) =>
  CONTACT.find(search, project)
    .sort({ _id: -1 })
    .lean()
    .exec();

const updateContact = async (search = {}, payload = {}, optional={}) =>
  CONTACT.findOneAndUpdate(search, payload, optional)
    .lean()
    .exec();

const updateContacts = async (search = {}, payload = {}, optional={}) =>
  CONTACT.updateMany(search, payload, optional)
    .lean()
    .exec();

const getContactsWithPagination = async (search = {}, project = {}, optional: any) =>
  CONTACT.find(search, project)
    .sort({ _id: -1 })
    .skip(optional.skip)
    .limit(optional.limit)
    .lean()
    .exec();

const getContactsCount = async (search = {}) => new Promise<number>((resolve, reject) => {
  CONTACT.countDocuments(search)
    .then(resolve)
    .catch(reject);
});
export { addContact, getContact, getContacts, updateContact, updateContacts, getContactsWithPagination, getContactsCount };
