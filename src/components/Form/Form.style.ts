import styled from 'styled-components';

const FormWrapper = styled.form`
  max-width: 300px;
  margin: 0 auto;
`;

const FormHeading = styled.h2`
  font-weight: 300;
  margin-bottom: 1em;
  text-align: center;
`;

const FormInputWrapper = styled.div`
  width: 100%;
  margin-bottom: 1em;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.3em;
`;

const FormInput = styled.input`
  display: block;
  width: 100%;
  font-size: 16px;
  padding: 0.4em;
  border-radius: 6px;
  border: 1px solid #333e5a;
`;

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

export {FormWrapper, FormHeading, FormInputWrapper,FormLabel, FormInput, StyledButton}