import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import TodoList from '../TodoList';
import { getTodos } from '../../api/Todos';

jest.mock('../../api/Todos');

describe('TodoList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the todo list', async () => {
    (getTodos as jest.Mock).mockResolvedValue([
      { id: 1, description: 'Todo 1', done: false },
      { id: 2, description: 'Todo 2', done: false },
    ]);

    render(<TodoList />);

    await waitFor(() => {
      expect(screen.getByText('Todo 1')).toBeInTheDocument();
      expect(screen.getByText('Todo 2')).toBeInTheDocument();
    });
  });

  it('renders a loading message', async () => {
    (getTodos as jest.Mock).mockResolvedValue([]);

    render(<TodoList />);

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('renders an error message', async () => {
    (getTodos as jest.Mock).mockRejectedValue(new Error('Failed to fetch todos'));

    render(<TodoList />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch todos')).toBeInTheDocument();
    });
  });

  it('toggles a todo', async () => {
    (getTodos as jest.Mock).mockResolvedValue([
      { id: 1, description: 'Todo 1', done: false },
      { id: 2, description: 'Todo 2', done: false },
    ]);

    render(<TodoList />);

    await waitFor(() => {
      expect(screen.getByText('Todo 1')).toBeInTheDocument();
      expect(screen.getByText('Todo 2')).toBeInTheDocument();
    });

    (getTodos as jest.Mock).mockResolvedValue([
      { id: 1, description: 'Todo 1', done: true },
      { id: 2, description: 'Todo 2', done: false },
    ]);

    const todo1Checkbox = screen.getByTestId('todo-1-checkbox');

    await act(async () => {
      fireEvent.click(todo1Checkbox);
    });

    await waitFor(() => {
      expect(todo1Checkbox).toBeChecked();
      expect(screen.getByText('Todo 2')).toBeInTheDocument();
    });
  });
});
