import React, { useEffect, useState } from "react";
import { RemoteParticipant as TwilioRemoteParticipant } from "twilio-video";
import {
  RoomContainer,
  RoomButton,
  RoomHeading3,
  RoomHeading2,
  LocalParticipantContainer,
  RemoteParticipantContainer,
} from "@src/components/Room/Room.style";
import Participant from "@src/components/Participant/Participant";
import { RoomProps, TwilioParticipant } from "@src/types/types";

const RoomComponent: React.FC<RoomProps> = ({
  roomName,
  room,
  handleLogout,
}) => {
  const [remoteParticipants, setRemoteParticipants] = useState<
    Map<string, TwilioParticipant>
  >(new Map());

  useEffect(() => {
    /**
     * @function participantConnected
     * @description Adds a connected participant to the state
     * @param {TwilioParticipant} participant - The participant that connected
     * @returns {void}
     */
    const participantConnected = (participant: TwilioParticipant) => {
      setRemoteParticipants((prevParticipants) => {
        if (!prevParticipants.has(participant.sid)) {
          return new Map(prevParticipants).set(participant.sid, participant);
        }
        return prevParticipants;
      });
    };

    /**
     * @function participantDisconnected
     * @description Removes a disconnected participant from the state
     * @param {TwilioParticipant} participant - The participant that disconnected
     * @returns {void}
     */
    const participantDisconnected = (participant: TwilioParticipant) => {
      setRemoteParticipants((prevParticipants) => {
        const newParticipants = new Map(prevParticipants);
        newParticipants.delete(participant.sid);
        return newParticipants;
      });
    };

    if (room) {
      // Register event listeners for participant connection and disconnection
      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);

      // Add already connected participants
      room.participants.forEach(participantConnected);

      // Cleanup event listeners on component unmount or when room changes
      return () => {
        room.off("participantConnected", participantConnected);
        room.off("participantDisconnected", participantDisconnected);
        setRemoteParticipants(new Map());
      };
    }
  }, [room]);

  return (
    <RoomContainer>
      <RoomHeading2>Room: {roomName}</RoomHeading2>
      <RoomButton onClick={handleLogout}>Log out</RoomButton>
      <LocalParticipantContainer>
        {room && (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        )}
      </LocalParticipantContainer>
      <RoomHeading3>Remote Participants</RoomHeading3>
      <RemoteParticipantContainer>
        {Array.from(remoteParticipants.values()).map((participant) => (
          <Participant
            key={participant.sid}
            participant={participant as TwilioRemoteParticipant}
          />
        ))}
      </RemoteParticipantContainer>
    </RoomContainer>
  );
};

export default RoomComponent;
