import { Todo as TodoType } from "../api/types/Todo";

interface Props {
  todo: TodoType;
  onToggleComplete: (id: string) => void;
}

const Todo = ({ todo, onToggleComplete }: Props): JSX.Element => {
  const onChange = () => {
    onToggleComplete(todo.id.toString());
  }

  return (
    <div key={todo.id} className="flex w-full p-4">
      <input type="checkbox" checked={todo.done} onChange={onChange} data-testid={`todo-${todo.id}-checkbox`} />
      <div className="ml-4 text-xl hover:cursor-text">{todo.description}</div>
    </div>
  );
};

export default Todo;
