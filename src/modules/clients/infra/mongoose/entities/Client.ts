import { ObjectId } from "mongodb";
import Address from "../../../../addresses/infra/mongoose/entities/Address";

export default class Client {
  _id: ObjectId;

  document: string;

  social_reason: string;

  contact_name: string;

  phone: string;

  addresses?: Address[];

  created_at: Date;

  updated_at: Date;
}
