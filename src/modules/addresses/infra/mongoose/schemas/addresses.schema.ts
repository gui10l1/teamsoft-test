import mongoose from "mongoose";
import { Decimal128 } from 'mongodb';

const addressesSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, 'address_is_blank'],
    },
    number: {
      type: String,
      required: [true, 'number_is_blank'],
    },
    complement: {
      type: String,
      required: false,
    },
    neighborhood: {
      type: String,
      required: [true, 'neighborhood_is_blank'],
    },
    city: {
      type: String,
      required: [true, 'city_is_blank'],
    },
    state: {
      type: String,
      required: [true, 'state_is_blank'],
    },
    postal_code: {
      type: String,
      required: [true, 'postalCode_is_blank'],
    },
    lat: {
      type: Decimal128,
      required: [true, 'lat_is_blank'],
    },
    lng: {
      type: Decimal128,
      required: [true, 'lng_is_blank'],
    },
    client_id: {
      type: String,
      required: [true, 'client_id_is_blank'],
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  }
);

addressesSchema.set('toJSON', {
  getters: true,
  transform: (doc, ret) => {
    if (ret.lat) {
      ret.lat = Number(ret.lat);
    }
    if (ret.lng) {
      ret.lng = Number(ret.lng);
    }
    delete ret.__v;
    return ret;
  },
});

export default addressesSchema;
