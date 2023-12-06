const API_URL = 'http://localhost:3000/';

interface Todo {
  id: number;
  description: string;
  done: boolean;
}

export const getTodos = async (): Promise<Todo[] | undefined>=> {
  try {
    const response = await fetch(`${API_URL}todos`);
    const todos = await response.json();
    return todos;
  } catch (error) {
    console.log(error);
  }
}

export const addTodo = async (todo: Todo): Promise<Todo | undefined> => {
  try {
    const response = await fetch(`${API_URL}todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
    const newTodo = await response.json();
    return newTodo;
  } catch (error) {
    console.log(error);
  }
}

export const deleteTodo = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}todos/${id}`, {
      method: 'DELETE'
    });
    const deletedTodo = await response.json();
    return deletedTodo;
  } catch (error) {
    console.log(error);
  }
}

export const updateTodo = async (id: string, todo: Todo) => {
  try {
    const response = await fetch(`${API_URL}todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
    const updatedTodo = await response.json();
    return updatedTodo;
  } catch (error) {
    console.log(error);
  }
}
