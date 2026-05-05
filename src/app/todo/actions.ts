'use server';

import { revalidatePath } from 'next/cache';

import { deleteTodo, toggleTodo } from '@/lib/services/todo-service';

const toggleTodoAction = async (id: string, isDone: boolean) => {
  try {
    await toggleTodo(id, isDone);
    revalidatePath('/todo');

    return { ok: true as const };
  } catch (error) {
    console.error('toggleTodoAction error:', error);
    return { ok: false as const, error: 'Не удалось обновить задачу' };
  }
};

const deleteTodoAction = async (id: string) => {
  try {
    await deleteTodo(id);
    revalidatePath('/todo');

    return { ok: true as const };
  } catch (error) {
    console.error('deleteTodoAction error:', error);
    return { ok: false as const, error: 'Не удалось удалить задачу' };
  }
};

export { toggleTodoAction, deleteTodoAction };
