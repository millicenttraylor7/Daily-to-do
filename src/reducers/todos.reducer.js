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
    case actions.FETCH_TODOS_START:
      return { ...state };

    case actions.FETCH_TODOS_SUCCESS:
      return { ...state };

    case actions.FETCH_TODOS_ERROR:
      return { ...state };

    case actions.ADD_TODO_START:
      return { ...state };

    case actions.ADD_TODO_SUCCESS:
      return { ...state };

    case actions.ADD_TODO_ERROR:
      return { ...state };

    case actions.UPDATE_TODO_OPTIMISTIC:
      return { ...state };

    case actions.UPDATE_TODO_ERROR:
      return { ...state };

    case actions.TOGGLE_TODO_COMPLETE:
      return { ...state };

    case actions.SET_SORT_FIELD:
      return { ...state };

    case actions.SET_SORT_DIRECTION:
      return { ...state };

    case actions.SET_QUERY_STRING:
      return { ...state };

    case actions.CLEAR_ERROR:
      return { ...state };

    default:
      return state;
  }
}

export { actions, initialState, todosReducer };
