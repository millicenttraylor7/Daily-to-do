// src/pages/TodosPage.jsx

import { useEffect, useReducer } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import TodoList from '../features/TodoList/TodoList';
import TodoForm from '../features/TodoForm';
import TodosViewForm from '../features/TodosViewForm';
import styles from '../App.module.css';
import { todosReducer, initialState, actions } from '../reducers/todos.reducer';

function TodosPage() {
  const [state, dispatch] = useReducer(todosReducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    todoList,
    isLoading,
    isSaving,
    errorMessage,
    sortField,
    sortDirection,
    queryString,
  } = state;

  // =========================
  // Pagination Setup
  // =========================
  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;

  const filteredTodoList = todoList;
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);

  const currentTodos = filteredTodoList.slice(
    indexOfFirstTodo,
    indexOfFirstTodo + itemsPerPage
  );

  // =========================
  // Validate currentPage safely
  // =========================
  useEffect(() => {
    if (totalPages > 0) {
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate('/');
      }
    }
  }, [currentPage, totalPages, navigate]);

  // =========================
  // Pagination Handlers
  // =========================
  const handlePreviousPage = () => {
    const newPage = Math.max(currentPage - 1, 1);
    setSearchParams({ page: newPage });
  };

  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    setSearchParams({ page: newPage });
  };

  // =========================
  // Fetch Todos from Airtable
  // =========================
  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: actions.FETCH_TODOS_START });

      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
      const token = `Bearer ${import.meta.env.VITE_PAT}`;

      try {
        const resp = await fetch(url, {
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
  }, []);

  return (
    <div className={styles.appWrapper}>
      <div className={styles.appContainer}>
        <h1>Todo List</h1>

        {isLoading && <p>Loading...</p>}

        <TodoForm
          onAddTodo={(title) =>
            dispatch({ type: actions.ADD_TODO_START, title })
          }
          isSaving={isSaving}
        />

        <TodoList
          todoList={currentTodos}
          isLoading={isLoading}
          onCompleteTodo={(id) =>
            dispatch({ type: actions.TOGGLE_TODO_COMPLETE, id })
          }
          onUpdateTodo={(editedTodo) =>
            dispatch({ type: actions.UPDATE_TODO_OPTIMISTIC, editedTodo })
          }
        />

        <TodosViewForm
          sortField={sortField}
          sortDirection={sortDirection}
          queryString={queryString}
          setSortField={(value) =>
            dispatch({ type: actions.SET_SORT_FIELD, sortField: value })
          }
          setSortDirection={(value) =>
            dispatch({ type: actions.SET_SORT_DIRECTION, sortDirection: value })
          }
          setQueryString={(value) =>
            dispatch({ type: actions.SET_QUERY_STRING, queryString: value })
          }
        />

        {/* Pagination Controls */}
        <div className={styles.paginationControls}>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>

      {errorMessage && (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => dispatch({ type: actions.CLEAR_ERROR })}>
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

export default TodosPage;
