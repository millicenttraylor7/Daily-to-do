import { useState, useEffect } from 'react';
import styled from 'styled-components';

/* Styled Components */
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const StyledFormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
`;

const StyledInput = styled.input`
  padding: 0.25rem;
`;

const StyledSelect = styled.select`
  padding: 0.25rem;
`;

const StyledButton = styled.button`
  padding: 0.25rem 0.5rem;
`;

/* Component */
function TodosViewForm({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  const preventRefresh = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  return (
    <StyledForm onSubmit={preventRefresh}>
      <StyledFormGroup>
        <label htmlFor="searchTodos">Search todos:</label>
        <StyledInput
          id="searchTodos"
          type="text"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
        <StyledButton type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </StyledButton>
      </StyledFormGroup>

      <StyledFormGroup>
        <label htmlFor="sortField">Sort by</label>
        <StyledSelect
          id="sortField"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </StyledSelect>

        <label htmlFor="sortDirection">Direction</label>
        <StyledSelect
          id="sortDirection"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </StyledSelect>
      </StyledFormGroup>
    </StyledForm>
  );
}

export default TodosViewForm;
