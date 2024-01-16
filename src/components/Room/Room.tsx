/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Participant from "../Participant/Participant";
import {
  RoomContainer,
  RoomButton,
  RoomH3,
  RoomH2,
  LocalParticipant,
  RemoteParticipants,
} from "./Room.style";

interface RoomProps {
  roomName: string;
  room?: any; // Replace 'any' with the actual type of your room object
  handleLogout: () => void;
}

const Room: React.FC<RoomProps> = ({ roomName, room, handleLogout }) => {
  const [participants, setParticipants] = useState<any[]>([]);

  useEffect(() => {
    const participantConnected = (participant: any) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant: any) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);

    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <RoomContainer>
      <RoomH2>Room: {roomName}</RoomH2>
      <RoomButton onClick={handleLogout}>Log out</RoomButton>
      <LocalParticipant>
        {room ? <Participant key={room.localParticipant.sid} participant={room.localParticipant} /> : ""}
      </LocalParticipant>
      <RoomH3>Remote Participants</RoomH3>
      <RemoteParticipants>{remoteParticipants}</RemoteParticipants>
    </RoomContainer>
  );
};

Room.propTypes = {
  roomName: PropTypes.string.isRequired,
  room: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
};

export default Room;
