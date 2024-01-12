import * as Yup from "yup";
import * as validationMessages from "./validationMessages"

export const validationSchema = Yup.object({
    username: Yup.string().required(validationMessages.NAME_REQUIRED),
    roomName: Yup.string().required(validationMessages.ROOM_NAME_REQUIRED),
  });

