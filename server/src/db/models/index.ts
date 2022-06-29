import { ObjectId } from 'mongodb';
import { DEDUCTION_FILE_STATUSES } from '../../constants';

type MongoDocument = {
    _id: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export type Customer = MongoDocument & {
    name: string;
}

export type DeductionFileStatus = typeof DEDUCTION_FILE_STATUSES[number];

export type DeductionFile = MongoDocument & {
    fileLocation: string;
    filename: string;
    customer : {
        id: string;
    };
    status: DeductionFileStatus,
    filesize: number,
    pages?: number;
    rawForms?: {
        key: string;
        value: string | undefined;
        confidence: number;
    }[][];
    rawTables?: {
        page: number;
        value: string;
        confidence: number;
        polyBounds: {
            x: number;
            y: number;
        }[];
    }[][][][];
}
