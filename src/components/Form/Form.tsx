import React from "react";
import {
  FormWrapper,
  FormInputWrapper,
  FormLabel,
  FormHeading,
  FormInput,
  StyledButton,
} from "./Form.style";
import PropTypes from "prop-types";
import { FormEvent } from "react";

interface FormProps {
  username: string;
  handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  roomName: string;
  handleRoomNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent) => void;
  connecting: boolean;
}

const Form: React.FC<FormProps> = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  connecting,
}) => {
  return (
    <FormWrapper onSubmit={handleSubmit}>
       <FormHeading>Enter a room</FormHeading>
       <FormInputWrapper>
        <FormLabel htmlFor="name">Name:</FormLabel>
        <FormInput
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          readOnly={connecting}
          required
        />
      </FormInputWrapper>

      <FormInputWrapper>
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

Form.propTypes = {
  username: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  roomName: PropTypes.string.isRequired,
  handleRoomNameChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  connecting: PropTypes.bool.isRequired,
};

export default Form;
