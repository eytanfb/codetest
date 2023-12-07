import { Todo } from './types/Todo';

const API_URL = process.env.API_ENV === 'production' ? 'https://eytan-todo-api-roaming-hunger-b74311822e2c.herokuapp.com' : 'http://localhost:3000';

export const getTodos = async () => {
  try {
    const response = await fetch(`${API_URL}/todos`);
    const todos = await response.json();
    return todos;
  } catch (error) {
    console.log(error);
  }
}

export const addTodo = async (description: string) => {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: description })
    });
    const newTodo = await response.json();
    return newTodo;
  } catch (error) {
    console.log(error);
  }
}

export const deleteTodo = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE'
    });
    const deletedTodo = await response.json();
    return deletedTodo;
  } catch (error) {
    console.log(error);
  }
}

export const updateTodo = async (id: number, todo: Todo) => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: todo.description, done: todo.done })
    });
    const updatedTodo = await response.json();
    return updatedTodo;
  } catch (error) {
    console.log(error);
  }
}
