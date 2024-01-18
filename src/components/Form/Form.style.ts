// Import the 'styled' function from 'styled-components'
import styled from "styled-components";

// Create a styled form wrapper using the 'form' HTML element
const FormWrapper = styled.form`
  max-width: 300px;
  margin: 0 auto;
`;

// Create a styled heading (H2) for the form with specific styles
const FormHeading = styled.h2`
  font-weight: 300;
  margin-bottom: 1em;
  text-align: center;
`;

// Create a styled wrapper for form input with specific width and margin
const FormInputWrapper = styled.div`
  width: 100%;
  margin-bottom: 1em;
`;

// Create a styled label for the form input with specific margin

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.3em;
`;

// Create a styled input element for the form with specific styles
const FormInput = styled.input`
  display: block;
  width: 100%;
  font-size: 16px;
  padding: 0.4em;
  border-radius: 6px;
  border: 1px solid #333e5a;
`;

// Create a styled button element with specific styles
const StyledButton = styled.button`
  background: #333e5a;
  color: #fff;
  font-size: 16px;
  padding: 0.4em;
  border-radius: 6px;
  border: 1px solid transparent;

  &:hover {
    filter: brightness(150%);
  }
`;

// Export the styled components for use in other parts of your application
export {
  FormWrapper,
  FormHeading,
  FormInputWrapper,
  FormLabel,
  FormInput,
  StyledButton,
};
