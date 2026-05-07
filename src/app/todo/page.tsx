import TodoList from '@/components/todo-list/todo-list';
import { getAllTodos } from '@/lib/services/todo-service';

import { TodoClient } from '@/types';

const TodoListPage = async () => {
  const todos: Array<TodoClient> = await getAllTodos();

  return (
    <>
      <TodoList todos={todos} />
    </>
  );
};

export default TodoListPage;
