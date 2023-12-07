import {useEffect, useState} from "react";
import { Todo as TodoType } from "../api/types/Todo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface Props {
  todo: TodoType;
  onToggleComplete: (id: number) => void;
  onDescriptionChange: (description: string) => void;
}

const PlaceholderTodo = ({ todo, onToggleComplete, onDescriptionChange }: Props): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setIsChecked(todo.done);
    setDescription(todo.description);
  }, []);

  const onChange = () => {
    onToggleComplete(todo.id);
    setIsChecked(!isChecked);
  }

  const onUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const description = event.target.value;

    if (description.length > 0) {
      setError('');
    }

    setDescription(description);
  };

  const onClick = () => {
    setIsEditing(true);
  }

  const onSave = () => {
    if (description === '') {
      setError('Description cannot be empty');
      return;
    }
    onDescriptionChange(description);
    setIsEditing(false);
    setDescription('');
    setError('');
  }

  const displayClasses = isChecked ? 'ml-4 text-xl line-through text-success' : 'ml-4 text-xl font-bold hover:cursor-text';
  const opacityClasses = isEditing ? '' : 'opacity-30';

  return (
    <div key={todo.id} className={`flex w-full p-4 ${opacityClasses}`}>
      <input type="checkbox" disabled checked={isChecked} onChange={onChange} data-testid={`todo-${todo.id}-checkbox`} />
        <div className="flex justify-between w-full">
          <div className="flex flex-col w-full">
            <input placeholder="Click to add new todo" type="text" className="flex-grow pl-4 ml-4 text-xl font-bold bg-background" onClick={onClick} onChange={onUpdate} data-testid={`todo-${todo.id}-input`} value={description} />
            { error && <span className="ml-8 text-xs text-danger">{error}</span> }
          </div>
          { isEditing &&
            <>
              <button className="flex items-center justify-center w-8 h-8 ml-4 text-xl font-bold text-white rounded-full bg-success" onClick={onSave} data-testid={`todo-${todo.id}-save`}>
                <FontAwesomeIcon icon={faCheck} size="xs" />
              </button>
            </>
          }
        </div>
    </div>
  );
};

export default PlaceholderTodo;
