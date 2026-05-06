import { useState, useTransition } from 'react';

import styles from './add-todo-bar.module.css';
import { addTodoAction } from '@/app/todo/actions';

const AddTodoBar = () => {
  const [currentValue, setCurrentValue] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = currentValue.trim();

    if (newTodo) {
      setCurrentValue('');
      startTransition(async () => {
        const result = await addTodoAction(newTodo);

        if (!result.ok) {
          console.error(result.error);
        }
      });
    }

  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} action="">
      <label className={styles.visuallyHidden} htmlFor="create_todo">
        Создать задачу
      </label>
      <input
        className={styles.todoInput}
        type="text"
        id="create_todo"
        placeholder="Введите вашу задачу..."
        value={currentValue}
        onChange={handleChange}
      />
      <button className={styles.button} type="submit" disabled={isPending}>
        Создать
      </button>
    </form>
  );
};

export default AddTodoBar;
