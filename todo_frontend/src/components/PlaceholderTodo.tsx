import {useEffect, useState} from "react";
import { Todo as TodoType } from "../api/types/Todo";

interface Props {
  todo: TodoType;
  onToggleComplete: (id: number) => void;
  onDescriptionChange: (description: string) => void;
}

const PlaceholderTodo = ({ todo, onToggleComplete, onDescriptionChange }: Props): JSX.Element => {
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
    onDescriptionChange(description);
    setIsEditing(false);
    setDescription('');
  }

  const displayClasses = isChecked ? 'ml-4 text-xl line-through text-success' : 'ml-4 text-xl font-bold hover:cursor-text';
  const opacityClasses = isEditing ? '' : 'opacity-30';

  return (
    <div key={todo.id} className={`flex w-full p-4 ${opacityClasses}`}>
      <input type="checkbox" checked={isChecked} onChange={onChange} data-testid={`todo-${todo.id}-checkbox`} />
        <div className="flex justify-between w-full">
          <input placeholder="Click to add new todo" type="text" className="flex-grow pl-4 ml-4 text-xl font-bold bg-background" onClick={onClick} onChange={onUpdate} defaultValue={todo.description} data-testid={`todo-${todo.id}-input`} value={description} />
          { isEditing && <button className="h-8 pl-8 ml-4 text-xl font-bold text-white rounded-full w-7 bg-success text-success" onClick={onSave} data-testid={`todo-${todo.id}-save`}></button> }
        </div>
    </div>
  );
};

export default PlaceholderTodo;
