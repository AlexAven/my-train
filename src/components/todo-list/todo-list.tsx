'use client'

import TodoItem from '../todo-item/todo-item';
import AddTodoBar from '../add-todo-bar/add-todo-bar';

import { TodoClient } from '@/types';

import styles from './todo-list.module.css'

type TodoListProps = {
  todos: Array<TodoClient>;
};

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className={styles.wrapper}>
      <h1>Список дел</h1>
      <AddTodoBar />
      <ul className={styles.todoList}>
        {todos.map((todo) => {
          return <TodoItem key={todo._id} todo={todo} />;
        })}
      </ul>
    </section>
  );
};

export default TodoList;
