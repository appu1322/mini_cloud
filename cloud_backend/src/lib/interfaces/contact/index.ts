interface PhoneSchema {
    dialCode: string;
    iso2: string;
    country: string;
    number: string;
}

interface Contact {
    email: string;
    mobileNumber: PhoneSchema;
}

export interface IUser {
    firstName?: string;
    gender?: 'MALE' | 'FEMALE' | 'TRANSGENDER';
    contact?: Contact;
    isDeleted?: boolean;
}
