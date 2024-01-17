import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Room as TwilioRoom, LocalParticipant as TwilioLocalParticipant, RemoteParticipant as TwilioRemoteParticipant } from "twilio-video"; // Adjust the imports based on the actual Twilio types
import Participant from "../Participant/Participant";
import {
  RoomContainer,
  RoomButton,
  RoomH3,
  RoomH2,
  LocalParticipantContainer,
  RemoteParticipants,
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
      <RoomH2>Room: {roomName}</RoomH2>
      <RoomButton onClick={handleLogout}>Log out</RoomButton>
      <LocalParticipantContainer>
        {room ? <Participant key={room.localParticipant.sid} participant={room.localParticipant} /> : ""}
      </LocalParticipantContainer>
      <RoomH3>Remote Participants</RoomH3>
      <RemoteParticipants>{remoteParticipants}</RemoteParticipants>
    </RoomContainer>
  );
};

Room.propTypes = {
  roomName: PropTypes.string.isRequired,
  room: PropTypes.instanceOf(TwilioRoom),
  handleLogout: PropTypes.func.isRequired,
};

export default Room;
