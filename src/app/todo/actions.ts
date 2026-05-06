'use server';

import { revalidatePath } from 'next/cache';

import { addTodo, deleteTodo, toggleTodo } from '@/lib/services/todo-service';

const addTodoAction = async (title: string) => {
  try {
    await addTodo(title);
    revalidatePath('/todo');

    return { ok: true as const };
  } catch (error) {
    console.error('addTodoAction error:', error);
    return { ok: false as const, error: 'Не создать задачу' };
  }
};

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

export { addTodoAction, toggleTodoAction, deleteTodoAction };
