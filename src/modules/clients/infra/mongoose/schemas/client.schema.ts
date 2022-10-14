import * as mongoose from 'mongoose';

const clientsSchema = new mongoose.Schema(
  {
    document: {
      type: String,
      required: [true, 'document_is_blank'],
    },
    social_reason: {
      type: String,
      required: [true, 'social_reason_is_blank'],
    },
    contact_name: {
      type: String,
      required: [true, 'contact_name_is_blank'],
    },
    phone: {
      type: String,
      required: [true, 'phone_is_blank'],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    versionKey: false,
  }
);

export default clientsSchema;
