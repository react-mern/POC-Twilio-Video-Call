import React, { FormEvent } from "react";
import {
  FormWrapper,
  FormInputWrapper,
  FormLabel,
  FormHeading,
  FormInput,
  StyledButton,
} from "./Form.style";
import PropTypes from "prop-types";

// Creating interface for the props of the component
interface FormProps {
  userName: string;
  handleUserNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  roomName: string;
  handleRoomNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent) => void;
  connecting: boolean;
}

const Form: React.FC<FormProps> = ({
  userName,
  handleUserNameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  connecting,
}) => {
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <FormHeading>Enter a room</FormHeading>
      <FormInputWrapper>
        {/* Form input for username */}
        <FormLabel htmlFor="name">Name:</FormLabel>
        <FormInput
          type="text"
          id="field"
          value={userName}
          onChange={handleUserNameChange}
          readOnly={connecting}
          required
        />
      </FormInputWrapper>

      <FormInputWrapper>
        {/* Form input for roomName */}
        <FormLabel htmlFor="room">Room name:</FormLabel>
        <FormInput
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          readOnly={connecting}
          required
        />
      </FormInputWrapper>

      <StyledButton type="submit" disabled={connecting}>
        {connecting ? "Connecting" : "Join"}
      </StyledButton>
    </FormWrapper>
  );
};

// PropTypes validation for the component props
Form.propTypes = {
  userName: PropTypes.string.isRequired,
  handleUserNameChange: PropTypes.func.isRequired,
  roomName: PropTypes.string.isRequired,
  handleRoomNameChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  connecting: PropTypes.bool.isRequired,
};

export default Form;
