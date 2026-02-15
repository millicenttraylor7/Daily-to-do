import { useReducer, useEffect, useCallback } from 'react';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import TodosViewForm from './features/TodosViewForm';
import './App.css';
import styles from './App.module.css';
import { todosReducer, initialState, actions } from './reducers/todos.reducer';

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialState);

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  // =========================
  // ENCODE URL (Sort + Search)
  // =========================
  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${todoState.sortField}&sort[0][direction]=${todoState.sortDirection}`;
    let searchQuery = '';

    if (todoState.queryString) {
      searchQuery = `&filterByFormula=SEARCH(LOWER("${todoState.queryString}"),LOWER({title}))`;
    }

    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [
    todoState.sortField,
    todoState.sortDirection,
    todoState.queryString,
    url,
  ]);

  // =========================
  // FETCH TODOS
  // =========================
  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: actions.FETCH_TODOS_START });

      try {
        const resp = await fetch(encodeUrl(), {
          headers: { Authorization: token },
        });

        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }

        const data = await resp.json();

        dispatch({
          type: actions.FETCH_TODOS_SUCCESS,
          records: data.records,
        });
      } catch (error) {
        dispatch({
          type: actions.FETCH_TODOS_ERROR,
          error,
        });
      }
    };

    fetchTodos();
  }, [encodeUrl, token]);

  // =========================
  // ADD TODO
  // =========================
  async function addTodo(title) {
    dispatch({ type: actions.ADD_TODO_START });

    const payload = {
      records: [
        {
          fields: {
            title,
            isCompleted: false,
          },
        },
      ],
    };

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }

      const { records } = await resp.json();

      dispatch({
        type: actions.ADD_TODO_SUCCESS,
        record: records[0],
      });
    } catch (error) {
      dispatch({
        type: actions.ADD_TODO_ERROR,
        error,
      });
    }
  }

  // =========================
  // COMPLETE TODO (Optimistic)
  // =========================
  function completeTodo(id) {
    dispatch({
      type: actions.TOGGLE_TODO_COMPLETE,
      id,
    });
  }

  // =========================
  // UPDATE TODO (Optimistic)
  // =========================
  async function updateTodo(editedTodo) {
    const originalTodo = todoState.todoList.find(
      (todo) => todo.id === editedTodo.id
    );

    dispatch({
      type: actions.UPDATE_TODO_OPTIMISTIC,
      editedTodo,
    });

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    try {
      const resp = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
    } catch (error) {
      dispatch({
        type: actions.UPDATE_TODO_ERROR,
        originalTodo,
        error,
      });
    }
  }

  return (
    <div className={styles.appWrapper}>
      <div className={styles.appContainer}>
        <h1>Todo List</h1>

        {todoState.isLoading && <p>Loading...</p>}

        <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving} />

        <TodoList
          todoList={todoState.todoList}
          isLoading={todoState.isLoading}
          onCompleteTodo={completeTodo}
          onUpdateTodo={updateTodo}
        />

        <TodosViewForm
          sortField={todoState.sortField}
          sortDirection={todoState.sortDirection}
          queryString={todoState.queryString}
          setSortField={(value) =>
            dispatch({
              type: actions.SET_SORT_FIELD,
              sortField: value,
            })
          }
          setSortDirection={(value) =>
            dispatch({
              type: actions.SET_SORT_DIRECTION,
              sortDirection: value,
            })
          }
          setQueryString={(value) =>
            dispatch({
              type: actions.SET_QUERY_STRING,
              queryString: value,
            })
          }
        />
      </div>

      {todoState.errorMessage && (
        <div>
          <hr />
          <p>{todoState.errorMessage}</p>
          <button onClick={() => dispatch({ type: actions.CLEAR_ERROR })}>
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
