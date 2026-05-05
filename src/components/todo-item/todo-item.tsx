'use client';

import { useOptimistic, useTransition } from 'react';

import toggleTodoAction from '@/app/todo/actions';

import type { TodoClient } from '@/types';

import styles from './todo-item.module.css'

type TodoItemProps = {
  todo: TodoClient;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticDone, setOptimisticDone] = useOptimistic(todo.isDone);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextChecked = event.target.checked;

    startTransition(async () => {
      setOptimisticDone(nextChecked);

      const result = await toggleTodoAction(todo._id, nextChecked);

      if (!result.ok) {
        console.error(result.error);
      }
    });
  };

  return (
    <li className={styles.item}>
      <input
        className={styles.checkbox}
        type="checkbox"
        name="todos"
        id={todo._id}
        checked={optimisticDone}
        value={todo.title}
        disabled={isPending}
        onChange={handleChange}
      />
      <label className={optimisticDone ? styles.done : ''} htmlFor={todo._id}>
        {todo.title}
      </label>
      <span className={styles.delCross}>&#x2715;</span>
    </li>
  );
};

export default TodoItem;
