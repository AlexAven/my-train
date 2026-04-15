import { InferSchemaType, Types } from 'mongoose';

import { userSchema } from '@/models/user';

type InferredUser = InferSchemaType<typeof userSchema>;

export type UserType = InferredUser & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type UserClient = {
  _id: string;
  name: string;
  email: string;
  phone: number;
  createdAt: string;
  updatedAt: string;
};
