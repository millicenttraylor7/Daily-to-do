import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import styles from './TodoListItem.module.css';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  // Handle input changes
  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  // Cancel editing
  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  // Handle updating the todo
  function handleUpdate(event) {
    // if isEditing is false, exit the function
    if (!isEditing) {
      return;
    }

    // prevent default form behavior
    event.preventDefault();

    // call onUpdateTodo with updated todo object
    onUpdateTodo({
      ...todo,
      title: workingTitle,
    });

    // exit editing mode
    setIsEditing(false);
  }

  return (
    <li className={styles.item}>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <TextInputWithLabel
            value={workingTitle}
            onChange={handleEdit}
            elementId={`todo${todo.id}`}
            labelText="Todo"
          />

          <button type="button" onClick={handleCancel}>
            Cancel
          </button>

          <button type="button" onClick={handleUpdate}>
            Update
          </button>
        </form>
      ) : (
        <form>
          <label>
            <input
              type="checkbox"
              id={`checkbox${todo.id}`}
              checked={todo.isCompleted}
              onChange={() => onCompleteTodo(todo.id)}
            />
          </label>

          <span onClick={() => setIsEditing(true)}>{todo.title}</span>
        </form>
      )}
    </li>
  );
}

export default TodoListItem;
