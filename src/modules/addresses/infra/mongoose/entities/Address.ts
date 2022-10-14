import { ObjectId } from "mongodb";

export default class Address {
  _id: ObjectId;

  address: string;

  number: string;

  complement?: string;

  neighborhood: string;

  city: string;

  state: string;

  postal_code: string;

  client_id: string;

  readonly lat: number;

  readonly lng: number;

  created_at: Date;

  updated_at: Date;
}
