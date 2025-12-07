import TodoList from './TodoList';
import TodoForm from './TodoForm';
import './App.css';
import { useState } from 'react';

function App() {
  const [newTodo, setTodos] = useState('New todo');

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm />
      <p>{newTodo}</p>
      <TodoList />
    </div>
  );
}
export default App;
