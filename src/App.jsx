import { useState, useEffect } from 'react';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      };

      try {
        const resp = await fetch(url, options);

        if (!resp.ok) {
          throw new Error(resp.message);
        }

        const data = await resp.json();
        const records = data.records;

        const todos = records.map((record) => {
          const todo = {};

          todo.id = record.id;
          todo.title = record.fields.title;
          todo.isCompleted = record.fields.isCompleted
            ? record.fields.isCompleted
            : false;

          return todo;
        });

        setTodoList(todos);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  function addTodo(title) {
    const newTodo = {
      id: Date.now(),
      title,
      isCompleted: false,
    };

    setTodoList([...todoList, newTodo]);
  }

  function completeTodo(id) {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setTodoList(updatedTodoList);
  }

  function updateTodo(editedTodo) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });

    setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>Todo List</h1>

      {isLoading && <p>Loading...</p>}

      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todoList={todoList}
        isLoading={isLoading}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />

      {errorMessage && (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage('')}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
