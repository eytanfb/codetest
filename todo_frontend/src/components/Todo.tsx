import { useEffect, useState } from "react";
import { Todo as TodoType } from "../api/types/Todo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

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
    if (description === '') {
      setError('Description cannot be empty');
      return;
    }
    onDescriptionChange(todo.id, description);
    setIsEditing(false);
  }

  const deleteTodo = () => {
    onDelete(todo.id);
  }

  const displayClasses = isChecked ? 'ml-4 text-xl line-through text-success' : 'ml-4 text-xl font-bold hover:cursor-text';

  return (
    <div key={todo.id} className={`flex w-full p-4 ${isChecked ? 'opacity-30' : ''}`}>
      <input type="checkbox" checked={isChecked} onChange={onChange} data-testid={`todo-${todo.id}-checkbox`} />
      { isEditing &&
        <div className="flex justify-between w-full">
          <input type="text" autoFocus className="flex-grow pl-4 ml-4 text-xl font-bold" onChange={onUpdate} value={description} data-testid={`todo-${todo.id}-input`} />
          <button className="w-8 h-8 ml-4 text-xl font-bold text-white rounded-full bg-success" onClick={onSave} data-testid={`todo-${todo.id}-save`}>
            <FontAwesomeIcon icon={faCheck} size="xs" />
          </button>
        </div>
      }
      { !isEditing &&
          <div className="flex justify-between w-full">
            <div className={displayClasses} onClick={onClick} data-testid={`todo-${todo.id}-input`}>{todo.description}</div>
            <button className="flex items-center justify-center w-8 h-8 ml-4 text-xl font-bold text-white rounded-full bg-danger" onClick={deleteTodo} data-testid={`todo-${todo.id}-delete`}>
              <FontAwesomeIcon icon={faTrash} size="xs" />
            </button>
          </div>
      }
    </div>
  );
};

export default Todo;
