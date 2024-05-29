import { FormEvent } from 'react';
import {
  Room,
  LocalTrack,
  RemoteTrack,
  LocalAudioTrack,
  LocalVideoTrack,
  RemoteParticipant,
  RemoteTrackPublication,
  LocalTrackPublication,
  LocalParticipant,
} from "twilio-video";
import {
    LocalParticipant as TwilioLocalParticipant,
    RemoteParticipant as TwilioRemoteParticipant,
  } from "twilio-video";

// Creating interface for the props of the component
export interface FormProps {
  userName: string;
  handleUserNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  roomName: string;
  handleRoomNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent) => void;
  connecting: boolean;
}

// VideoCall Component
export interface TrackPublication {
  track: LocalTrack | RemoteTrack | LocalAudioTrack | LocalVideoTrack;
}

// State interface for the VideoCall module
export interface VideoCallModuleState {
  userName: string;
  roomName: string;
  room: Room | null;
  connecting: boolean;
}

// Interface to extend the Event object for custom before unload event handling
export interface CustomBeforeUnloadEvent extends Event {
  persisted: boolean;
}

// Participant component
export interface ParticipantProps {
    participant: RemoteParticipant | LocalParticipant;
  }
  
export type ParticipantTrackPublication = LocalTrackPublication | RemoteTrackPublication;
  
export type TrackType = LocalTrack | RemoteTrack;

// Room component
export interface RoomProps {
    roomName: string;
    room?: Room|null;
    handleLogout: () => void;
  }
  
export type TwilioParticipant = TwilioLocalParticipant | TwilioRemoteParticipant;
  