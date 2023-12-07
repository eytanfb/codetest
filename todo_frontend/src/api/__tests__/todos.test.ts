/**
 * @jest-environment node
 */

import { getTodos, addTodo, deleteTodo, updateTodo } from '../Todos';

const API_URL = 'http://localhost:3000';

describe('getTodos', () => {
  it('should fetch todos from the API', async () => {
    const mockResponse = [
      { id: 1, description: 'Todo 1', done: false },
      { id: 2, description: 'Todo 2', done: true },
    ];

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse)
    } as any);

    const todos = await getTodos();

    expect(todos).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/todos`);
  });
});

describe('addTodo', () => {
  it('should add a new todo to the API', async () => {
    const newTodo = { id: 3, description: 'New Todo', done: false };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(newTodo),
    } as any);

    const addedTodo = await addTodo(newTodo);

    expect(addedTodo).toEqual(newTodo);
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
  });
});

describe('deleteTodo', () => {
  it('should delete a todo from the API', async () => {
    const id = '1';
    const mockResponse = { id: 1, description: 'Todo 1', done: false };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    } as any);

    await deleteTodo(id);

    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });
  });
});

describe('updateTodo', () => {
  it('should update a todo in the API', async () => {
    const id = '1';
    const updatedTodo = { id: 1, description: 'Updated Todo', done: true };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(updatedTodo),
    } as any);

    const todo = await updateTodo(id, updatedTodo);

    expect(todo).toEqual(updatedTodo);
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: updatedTodo.description, done: updatedTodo.done }),
    });
  });
});
