import { useRef, useState } from 'react';
import styled from 'styled-components';
import TextInputWithLabel from '../shared/TextInputWithLabel';

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
`;
const StyledButton = styled.button`
  padding: 0.25rem 0.75rem;

  &:disabled {
  font-style: italic;
  opacity: 0.6; 
] 
`;

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef(null);
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();

    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');

    todoTitleInput.current.focus(); // Focus on the input field after adding a new todo
  }

  return (
    <StyledForm onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="new-todo"
        labelText="Todo"
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        ref={todoTitleInput}
      />
      <StyledButton type="submit" disabled={workingTodoTitle === ''}>
        Add Todo
      </StyledButton>
    </StyledForm>
  );
}

export default TodoForm;
