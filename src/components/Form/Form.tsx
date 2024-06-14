import React from "react";
import PropTypes from "prop-types";
import {
  FormWrapper,
  FormInputWrapper,
  FormLabel,
  FormHeading,
  FormInput,
  StyledButton,
} from "@src/components/Form/Form.style";
import { FormProps } from "@src/types/types";

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
        {/* Input field for username */}
        <FormLabel htmlFor="name">Name:</FormLabel>
        <FormInput
          type="text"
          id="field"
          value={userName}
          onChange={handleUserNameChange}
          disabled={connecting}
          required
        />
      </FormInputWrapper>

      <FormInputWrapper>
        {/* Input field for room name */}
        <FormLabel htmlFor="room">Room name:</FormLabel>
        <FormInput
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          disabled={connecting}
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
