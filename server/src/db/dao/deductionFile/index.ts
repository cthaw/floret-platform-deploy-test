import { OptionalId } from 'mongodb';
import { getDb } from '../..';
import { DeductionFile } from '../../models';
import log from '../../../logger';

const dataType = 'DeductionFile';
const coll = getDb().collection<OptionalId<DeductionFile>>('deductionFiles');

const createDeductionFile = async (doc: OptionalId<DeductionFile>) => {
  const { insertedId: _id } = await coll.insertOne(doc);
  if (!_id) {
    throw new Error(`Deduction File ${doc.filename} was not created`);
  }

  log.info(`Created deduction file record for ${doc.filename}`, { _id, dataType });
  return _id;
};

const getCustomerDeductionFiles = async (customerId: string) => coll.find({ 'customer.id': customerId }).toArray();

export {
  createDeductionFile,
  getCustomerDeductionFiles,
};
