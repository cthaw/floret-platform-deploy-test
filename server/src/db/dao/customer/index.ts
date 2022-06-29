import { ObjectId, OptionalId } from 'mongodb';
import { getDb } from '../..';
import { Customer } from '../../models';
import log from '../../../logger';

const dataType = 'Customer';
const coll = getDb().collection<OptionalId<Customer>>('customers');

const createCustomer = async (doc: OptionalId<Customer>) => {
  const { insertedId: _id } = await coll.insertOne(doc);
  if (!_id) {
    throw new Error(`Customer ${doc.name} was not created`);
  }

  log.info(`Created customer ${doc.name}`, { _id, dataType });
  return _id.toString();
};

const getCustomer = (customerId: string) => coll.findOne({ _id: new ObjectId(customerId) });

export {
  createCustomer,
  getCustomer,
};
