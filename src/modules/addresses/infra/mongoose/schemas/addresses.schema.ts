import mongoose from "mongoose";

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
      type: String,
      required: [true, 'lat_is_blank'],
    },
    long: {
      type: String,
      required: [true, 'long_is_blank'],
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

export default addressesSchema;
