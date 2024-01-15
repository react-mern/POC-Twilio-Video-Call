import React from "react";
import { RoomContainer,RoomButton,RoomH3,RoomH2,LocalParticipant,RemoteParticipants } from "./RoomStyle";

const Room: React.FC = () => {

  return (
    <RoomContainer>
      <RoomH2>Room: {roomName}</RoomH2>
      <RoomButton onClick={handleLogout}>Log out</RoomButton>
      <LocalParticipant>
      </LocalParticipant>
      <RoomH3>Remote Participants</RoomH3>
      <RemoteParticipants>{remoteParticipants}</RemoteParticipants>
    </RoomContainer>
  );
};

export default Room;