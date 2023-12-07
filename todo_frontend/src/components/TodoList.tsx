import { useEffect, useState } from 'react';
import { Todo as TodoType } from '../api/types/Todo';
import * as TodoAPI from '../api/Todos';
import Todo from './Todo';
import PlaceholderTodo from './PlaceholderTodo';

const sortTodosByDone = (todos: TodoType[]): TodoType[] => {
  const unsortedTodos = [...todos];

  unsortedTodos.sort((a: TodoType, b: TodoType) => {
    if (a.done && !b.done) {
      return 1;
    }

    if (!a.done && b.done) {
      return -1;
    }

    return 0;
  });

  return unsortedTodos;
}

const TodoList = (): JSX.Element => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const todos = await TodoAPI.getTodos();

        const sortedTodos = sortTodosByDone(todos);
        setTodos(sortedTodos);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTodos();
  }, []);

  const toggleComplete = async (id: number) => {
    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      return;
    }

    try {
      const updatedTodo = {
        ...todo,
        done: !todo.done,
      };

      await TodoAPI.updateTodo(id, updatedTodo);

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

  const updateDescription = async (id: number, description: string) => {
    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      return;
    }

    try {
      const updatedTodo = {
        ...todo,
        description,
      };

      await TodoAPI.updateTodo(id, updatedTodo);

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

  const addTodo = async (description: string) => {
    try {
      const todo = await TodoAPI.addTodo(description);

      setTodos([...todos, todo]);
    } catch (error: any) {
      setError(error.message);
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      await TodoAPI.deleteTodo(id);

      const updatedTodos = todos.filter((todo) => todo.id !== id);

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
        <Todo key={todo.id} todo={todo} onToggleComplete={toggleComplete} onDescriptionChange={updateDescription} onDelete={deleteTodo} />
      ))}
      <PlaceholderTodo todo={{ id: 0, description: '', done: false }} onToggleComplete={toggleComplete} onDescriptionChange={addTodo} />
    </div>
  );
}

export default TodoList;
