import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Room as TwilioRoom, LocalParticipant as TwilioLocalParticipant, RemoteParticipant as TwilioRemoteParticipant } from "twilio-video"; // Adjust the imports based on the actual Twilio types
import Participant from "../Participant/Participant";
import {
  RoomContainer,
  RoomButton,
  RoomHeading3,
  RoomHeading2,
  LocalParticipantContainer,
  RemoteParticipantContainer,
} from "./Room.style";

interface RoomProps {
  roomName: string;
  room?: TwilioRoom;
  handleLogout: () => void;
}

type TwilioParticipant = TwilioLocalParticipant | TwilioRemoteParticipant;

const Room: React.FC<RoomProps> = ({ roomName, room, handleLogout }) => {
  const [participants, setParticipants] = useState<TwilioParticipant[]>([]);

  useEffect(() => {
    const participantConnected = (participant: TwilioParticipant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant: TwilioParticipant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    if (room) {
      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);
      room.participants.forEach(participantConnected);

      return () => {
        room.off("participantConnected", participantConnected);
        room.off("participantDisconnected", participantDisconnected);
      };
    }
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <RoomContainer>
      <RoomHeading2>Room: {roomName}</RoomHeading2>
      <RoomButton onClick={handleLogout}>Log out</RoomButton>
      <LocalParticipantContainer>
        {room ? <Participant key={room.localParticipant.sid} participant={room.localParticipant} /> : ""}
      </LocalParticipantContainer>
      <RoomHeading3>Remote Participants</RoomHeading3>
      <RemoteParticipantContainer>{remoteParticipants}</RemoteParticipantContainer>
    </RoomContainer>
  );
};

Room.propTypes = {
  roomName: PropTypes.string.isRequired,
  room: PropTypes.instanceOf(TwilioRoom),
  handleLogout: PropTypes.func.isRequired,
};

export default Room;
