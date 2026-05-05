import normalizeTodo from '@/lib/utils/normalize-todo';
import TodoItem from '../todo-item/todo-item';

import { TodoClient } from '@/types';

import styles from './todo-list.module.css'

type TodoListProps = {
  todos: Array<TodoClient>;
};

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <div>
      <ul className={styles.todoList}>
        {todos.map((item) => {
          const todo = normalizeTodo(item);
          return <TodoItem key={todo._id} todo={todo} />;
        })}
      </ul>
    </div>
  );
};

export default TodoList;
