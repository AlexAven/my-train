import { Schema, models, model } from 'mongoose';

export const userSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: false,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = models.User || model('User', userSchema);

export default User;
