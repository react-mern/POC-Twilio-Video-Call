import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import {
    FormWrapper,
  FormInputWrapper,
  FormLabel,
  FormHeading,
  StyledButton,
} from "./Form.style";
import { validationSchema } from "../../constants/formValidation";
import { ErrorStyle } from "../../styled/Error.style";

const Form:React.FC = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  connecting,
}) => {
  return (
    <Formik
      initialValues={{ username: "", roomName: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormWrapper>
        <FormHeading>Enter a room</FormHeading>
        <FormInputWrapper>
          <FormLabel htmlFor="username">Name:</FormLabel>
          <Field
            type="text"
            id="username"
            placeholder="Your name"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            readOnly={connecting}
          />
          <ErrorMessage name="username" component={ErrorStyle} />
        </FormInputWrapper>

        <FormInputWrapper>
          <FormLabel htmlFor="roomName">Room name:</FormLabel>
          <Field
            type="text"
            id="roomName"
            placeholder="Room name"
            name="roomName"
            value={roomName}
            onChange={handleRoomNameChange}
            readOnly={connecting}
          />
          <ErrorMessage name="roomName" component={ErrorStyle} />
        </FormInputWrapper>

        <StyledButton type="submit" disabled={connecting}>
          {connecting ? "Connecting" : "Join"}
        </StyledButton>
      </FormWrapper>
    </Formik>
  );
};

export default Form;

