import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Room as TwilioRoom,
  LocalParticipant as TwilioLocalParticipant,
  RemoteParticipant as TwilioRemoteParticipant,
} from "twilio-video";
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
  // State to manage the list of participants in the room
  const [participants, setParticipants] = useState<TwilioParticipant[]>([]);

  useEffect(() => {
    // Callback function to handle a participant connection
    const participantConnected = (participant: TwilioParticipant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    // Callback function to handle a participant disconnection
    const participantDisconnected = (participant: TwilioParticipant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    // Event listeners for participant connection and disconnection
    if (room) {
      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);
      // Initial setup for existing participants in the room
      room.participants.forEach(participantConnected);

      // Cleanup: Remove event listeners when the component unmounts or the room changes
      return () => {
        room.off("participantConnected", participantConnected);
        room.off("participantDisconnected", participantDisconnected);
      };
    }
  }, [room]);

  // Map the remote participants to Participant components
  const remoteParticipants = participants.map((participant) => (
    <Participant
      key={participant.sid}
      participant={participant as TwilioRemoteParticipant}
    />
  ));

  // rendering of the styled components
  return (
    <RoomContainer>
      <RoomHeading2>Room: {roomName}</RoomHeading2>
      <RoomButton onClick={handleLogout}>Log out</RoomButton>
      <LocalParticipantContainer>
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ""
        )}
      </LocalParticipantContainer>
      <RoomHeading3>Remote Participants</RoomHeading3>
      <RemoteParticipantContainer>
        {remoteParticipants}
      </RemoteParticipantContainer>
    </RoomContainer>
  );
};

// PropTypes validation for the component props
Room.propTypes = {
  roomName: PropTypes.string.isRequired,
  room: PropTypes.instanceOf(TwilioRoom),
  handleLogout: PropTypes.func.isRequired,
};

export default Room;
