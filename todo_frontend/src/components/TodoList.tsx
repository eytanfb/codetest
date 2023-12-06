import { useEffect, useState } from 'react';
import { Todo as TodoType } from '../api/types/Todo';
import { getTodos, updateTodo } from '../api/Todos';
import Todo from './Todo';

const TodoList = (): JSX.Element => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const todos = await getTodos();
        setTodos(todos);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTodos();
  }, []);

  const toggleComplete = async (id: string) => {
    const todo = todos.find((todo) => todo.id.toString() === id);

    if (!todo) {
      return;
    }

    try {
      const updatedTodo = {
        ...todo,
        done: !todo.done,
      };

      await updateTodo(id, updatedTodo);

      const updatedTodos = todos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }

        return todo;
      });

      setTodos(updatedTodos);
    } catch (error: any) {
      setError(error.message);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error && <div>{error}</div>}
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onToggleComplete={toggleComplete} />
      ))}
    </div>
  );
}

export default TodoList;
