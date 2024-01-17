
import React, { useState, useCallback, useEffect } from "react";
import Video, { Room, ConnectOptions, LocalTrack, RemoteTrack, LocalAudioTrack, LocalVideoTrack } from "twilio-video";
import Form from "../Form/Form";
import RoomComponent from "../Room/Room"; 

interface VideoCallModuleProps {}

interface TrackPublication {
  track: LocalTrack | RemoteTrack | LocalAudioTrack | LocalVideoTrack ;
}

interface VideoCallModuleState {
  username: string;
  roomName: string;
  room: Room | null;
  connecting: boolean;
}

interface CustomBeforeUnloadEvent extends Event {
  persisted: boolean;
  }

const VideoCallModule: React.FC<VideoCallModuleProps> = () => {
  const [state, setState] = useState<VideoCallModuleState>({
    username: "",
    roomName: "",
    room: null,
    connecting: false,
  });

  const handleUsernameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, username: event.target.value }));
  }, []);

  const handleRoomNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, roomName: event.target.value }));
  }, []);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, connecting: true }));

    try {
      const response = await fetch("http://localhost:3001/video/token", {
        method: "POST",
        body: JSON.stringify({
          identity: state.username,
          room: state.roomName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      Video.connect(data.token, {
        name: state.roomName,
      } as ConnectOptions)
        .then((room: Room) => {
          setState((prevState) => ({ ...prevState, connecting: false, room }));
        })
        .catch((err) => {
          console.error("Error connecting to video room:", err);
          setState((prevState) => ({ ...prevState, connecting: false }));
        });
    } catch (error) {
      console.error("Error fetching token:", error);
      setState((prevState) => ({ ...prevState, connecting: false }));
    }
  }, [state]);

  const handleLogout = useCallback(() => {
    setState((prevState) => {
      const prevRoom = prevState.room;
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub: TrackPublication) => {
          const track = trackPub.track;
          if (track.kind === "video" || track.kind === "audio") {
            (track as LocalTrack | RemoteTrack).stop();
          }
        });
        prevRoom.disconnect();
      }
      return { ...prevState, room: null };
    });
  }, []);

  useEffect(() => {
    const { room } = state;
    if (room) {
      const tidyUp = (event: Event) => {
        const BeforeUnloadEvent = event as CustomBeforeUnloadEvent;
        if (BeforeUnloadEvent.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [state.room, handleLogout]);

  return state.room ? (
    <RoomComponent roomName={state.roomName} room={state.room} handleLogout={handleLogout} />
  ) : (
    <Form
      username={state.username}
      roomName={state.roomName}
      handleUsernameChange={handleUsernameChange}
      handleRoomNameChange={handleRoomNameChange}
      handleSubmit={handleSubmit}
      connecting={state.connecting}
    />
  );
};

export default VideoCallModule;
