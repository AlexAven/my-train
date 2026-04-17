import { Schema, model, models } from 'mongoose';

export const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: false,
      minlength: 1,
      maxlength: 100,
      trim: true,
    },
    isDone: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Todo = models.Todo || model('Todo', todoSchema);

export default Todo;
