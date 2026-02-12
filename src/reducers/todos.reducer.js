// src/reducers/todos.reducer.js

const actions = {
  FETCH_TODOS_START: 'FETCH_TODOS_START',
  FETCH_TODOS_SUCCESS: 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_ERROR: 'FETCH_TODOS_ERROR',

  ADD_TODO_START: 'ADD_TODO_START',
  ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
  ADD_TODO_ERROR: 'ADD_TODO_ERROR',

  UPDATE_TODO_OPTIMISTIC: 'UPDATE_TODO_OPTIMISTIC',
  UPDATE_TODO_ERROR: 'UPDATE_TODO_ERROR',

  TOGGLE_TODO_COMPLETE: 'TOGGLE_TODO_COMPLETE',

  SET_SORT_FIELD: 'SET_SORT_FIELD',
  SET_SORT_DIRECTION: 'SET_SORT_DIRECTION',
  SET_QUERY_STRING: 'SET_QUERY_STRING',

  CLEAR_ERROR: 'CLEAR_ERROR',
};

const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
  sortField: 'createdTime',
  sortDirection: 'desc',
  queryString: '',
};

function todosReducer(state = initialState, action) {
  switch (action.type) {
    // ===============================
    // Fetch Todos
    // ===============================

    case actions.FETCH_TODOS_START:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };

    case actions.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todoList: action.records.map((record) => ({
          id: record.id,
          title: record.fields.title,
          createdTime: record.createdTime,
          isCompleted: record.fields.isCompleted ?? false,
        })),
        isLoading: false,
      };

    case actions.FETCH_TODOS_ERROR:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
      };

    // ===============================
    // Add Todo
    // ===============================

    case actions.ADD_TODO_START:
      return {
        ...state,
        isSaving: true,
        errorMessage: '',
      };

    case actions.ADD_TODO_SUCCESS: {
      const savedTodo = {
        id: action.record.id,
        title: action.record.fields.title,
        createdTime: action.record.createdTime,
        isCompleted: action.record.fields.isCompleted ?? false,
      };

      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
      };
    }

    case actions.ADD_TODO_ERROR:
      return {
        ...state,
        isSaving: false,
        errorMessage: action.error.message,
      };

    // ===============================
    // Update (Optimistic)
    // ===============================

    case actions.UPDATE_TODO_OPTIMISTIC:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.editedTodo.id ? { ...action.editedTodo } : todo
        ),
      };

    case actions.UPDATE_TODO_ERROR:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.originalTodo.id ? { ...action.originalTodo } : todo
        ),
        errorMessage: action.error.message,
      };

    // ===============================
    // Complete Todo
    // ===============================

    case actions.TOGGLE_TODO_COMPLETE:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.id
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
      };

    // ===============================
    // Sort & Filter
    // ===============================

    case actions.SET_SORT_FIELD:
      return {
        ...state,
        sortField: action.sortField,
      };

    case actions.SET_SORT_DIRECTION:
      return {
        ...state,
        sortDirection: action.sortDirection,
      };

    case actions.SET_QUERY_STRING:
      return {
        ...state,
        queryString: action.queryString,
      };

    // ===============================
    // Clear Error
    // ===============================

    case actions.CLEAR_ERROR:
      return {
        ...state,
        errorMessage: '',
      };

    default:
      return state;
  }
}

export { actions, initialState, todosReducer };
