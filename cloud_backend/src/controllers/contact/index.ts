import { Router } from 'express';
import { makeResponse } from '../../lib';
import { addContactValidation, updateContactValidation } from '../../middlewares';
import { addContact, updateContact, getContact, getContacts, getContactsWithPagination, getContactsCount, updateContacts } from '../../services';

const router = Router();

router
    .post(
        '/',
        addContactValidation,
        async (req, res) => {
            const { contact } = req.body;
            const search = {
                'contact.email': contact.email,
                'contact.mobileNumber.number': contact.mobileNumber.number
            };
            try {
                contact.email
                const exist = await getContact(search);

                if (exist) {
                    return makeResponse(res, 400, false, 'User already exits', undefined);
                }
                const result = await addContact(req.body);
                await makeResponse(res, 200, true, "User created successfully", result);
            } catch (error) {
                await makeResponse(res, 400, false, (error as { message: string }).message, undefined);
            }
        })

    .put('/',
        updateContactValidation,
        async (req, res) => {
            const { _id, ...payload } = req.body;

            try {

                if (payload?.contact) {
                    const isExist = await getContact({
                        _id: { $ne: _id },
                        'contact.email': payload.contact.email,
                        'contact.mobileNumber.number': payload?.contact?.mobileNumber.number,
                    });

                    if (isExist) {
                        return makeResponse(res, 400, true, 'User already exits');
                    }
                }

                const result = await updateContact({ _id }, payload, { new: true })
                await makeResponse(res, 200, true, 'User updated successfully', result);
            } catch (error) {

                await makeResponse(res, 400, false, (error as { message: string }).message, undefined);
            }
        })

    .get('/',
        (req, res) => {
            const { _id } = req.query as { _id: string };
            if (!_id) {
                return makeResponse(res, 400, false, "_id is required", undefined);
            }

            getContact({ _id, isDeleted: false })
                .then(async (result: any) => {
                    await makeResponse(res, 200, true, "User fetched successfully", result);
                })
                .catch(async error => {
                    await makeResponse(res, 400, false, error.message, undefined);
                });
        }
    )

    .delete('/', (req, res) => {
        const { _ids } = req.body as any;
        if (!_ids || !_ids?.length) {
            return makeResponse(res, 400, false, "_id is required", undefined);
        }
        updateContacts({ _id: { $in: _ids } }, { isDeleted: true }, { new: true })
            .then(async (result: any) => {
                await makeResponse(res, 200, true, "User deleted successfully", result);
            })
            .catch(async error => {
                await makeResponse(res, 400, false, error.message, undefined);
            });
    });

router
    .get('/list', async (req, res) => {
        const query = req.query as any;

        const searchQuery: any = query.search ? { isDeleted: false, $or: [] } : { isDeleted: false };

        const keys = Object.keys(query);
        keys.map((key: string) => {
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
                if (query.page) { page = Number(query.page); }
                if (query.limit) { limit = Number(query.limit); }
                skip = (page - 1) * limit;
                const documentsCount = await getContactsCount(searchQuery);
                const data = await getContactsWithPagination(searchQuery, { __v: 0 }, { skip, limit });
                await makeResponse(res, 200, true, "User fetched successfully", data, {
                    page,
                    totalPages: Math.ceil(documentsCount / limit),
                    totalRecords: documentsCount
                });
            } else {
                const data = await getContacts(searchQuery, { __v: 0 });
                await makeResponse(res, 200, true, "User fetched successfully", data);
            }
        } catch (error: any) {
            await makeResponse(res, 400, false, error.message, undefined);
        }
    });

router
    .get('/text', async (req, res) => {
        await makeResponse(res, 200, true, "User fetched successfully", {
            qwerty: process.env.USER
        });
    })

export const contactController = router;
