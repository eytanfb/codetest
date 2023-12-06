import {useEffect, useState} from "react";
import { Todo as TodoType } from "../api/types/Todo";

interface Props {
  todo: TodoType;
  onToggleComplete: (id: string) => void;
}

const Todo = ({ todo, onToggleComplete }: Props): JSX.Element => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(todo.done);
  }, []);

  const onChange = () => {
    onToggleComplete(todo.id.toString());
    setChecked(!checked);
  }

  return (
    <div key={todo.id} className="flex w-full p-4">
      <input type="checkbox" checked={checked} onChange={onChange} data-testid={`todo-${todo.id}-checkbox`} />
      { checked && <div className="ml-4 text-xl line-through text-success">{todo.description}</div> }
      { !checked && <div className="ml-4 text-xl font-bold hover:cursor-text">{todo.description}</div>}
    </div>
  );
};

export default Todo;
