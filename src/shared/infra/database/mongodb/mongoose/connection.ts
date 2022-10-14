import * as mongoose from 'mongoose';

import mongodbConfig from '../../../../../config/mongodbConfig';

export default async function connect(): Promise<void> {
  await mongoose.connect(mongodbConfig.host);
}
