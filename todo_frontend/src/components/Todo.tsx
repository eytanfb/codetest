import { useEffect, useState } from "react";
import { Todo as TodoType } from "../api/types/Todo";

interface Props {
  todo: TodoType;
  onToggleComplete: (id: number) => void;
  onDescriptionChange: (id: number, description: string) => void;
  onDelete: (id: number) => void;
}

const Todo = ({ todo, onToggleComplete, onDescriptionChange, onDelete }: Props): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    setIsChecked(todo.done);
    setDescription(todo.description);
  }, []);

  const onChange = () => {
    onToggleComplete(todo.id);
    setIsChecked(!isChecked);
  }

  const onUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const onClick = () => {
    setIsEditing(true);
  }

  const onSave = () => {
    onDescriptionChange(todo.id, description);
    setIsEditing(false);
  }

  const deleteTodo = () => {
    onDelete(todo.id);
  }

  const displayClasses = isChecked ? 'ml-4 text-xl line-through text-success' : 'ml-4 text-xl font-bold hover:cursor-text';

  return (
    <div key={todo.id} className="flex w-full p-4">
      <input type="checkbox" checked={isChecked} onChange={onChange} data-testid={`todo-${todo.id}-checkbox`} />
      { isEditing &&
        <div className="flex justify-between w-full">
          <input type="text" autoFocus className="flex-grow pl-4 ml-4 text-xl font-bold" onChange={onUpdate} defaultValue={todo.description} data-testid={`todo-${todo.id}-input`} />
          <button className="h-8 pl-8 ml-4 text-xl font-bold rounded-full w-7 bg-success" onClick={onSave} data-testid={`todo-${todo.id}-save`}></button>
        </div>
      }
      { !isEditing &&
          <div className="flex justify-between w-full">
            <div className={displayClasses} onClick={onClick} data-testid={`todo-${todo.id}-input`}>{todo.description}</div>
            <button className="h-8 pl-8 ml-4 text-xl font-bold rounded-full w-7 bg-danger" onClick={deleteTodo} data-testid={`todo-${todo.id}-delete`}></button>
          </div>
      }
    </div>
  );
};

export default Todo;
