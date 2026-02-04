import styled from 'styled-components';
import { forwardRef } from 'react';

/* Styled Components */
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
`;

const StyledLabel = styled.label`
  margin-bottom: 0.25rem;
`;

const StyledInput = styled.input`
  padding: 0.25rem;
`;

/* Component */
const TextInputWithLabel = forwardRef(
  ({ elementId, labelText, onChange, value }, ref) => {
    return (
      <StyledWrapper>
        <StyledLabel htmlFor={elementId}>{labelText}</StyledLabel>
        <StyledInput
          type="text"
          id={elementId}
          ref={ref}
          value={value}
          onChange={onChange}
        />
      </StyledWrapper>
    );
  }
);

export default TextInputWithLabel;
