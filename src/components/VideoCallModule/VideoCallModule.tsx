import React, { useState, useCallback, useEffect } from "react";
import Video, { Room, ConnectOptions, LocalTrack } from "twilio-video";
import Form from "@src/components/Form/Form";
import RoomComponent from "@src/components/Room/RoomComponent";
import Loader from "@src/components/Loader/Loader";
import { TRACK_KIND_AUDIO, TRACK_KIND_VIDEO } from "@src/constants/trackType";
import {
  TrackPublication,
  VideoCallModuleState,
  CustomBeforeUnloadEvent,
} from "@src/types/types";

const VideoCallModule: React.FC = () => {
  const [state, setState] = useState<VideoCallModuleState>({
    userName: localStorage.getItem("userName") || "",
    roomName: localStorage.getItem("roomName") || "",
    room: null,
    connecting: false,
  });
  const [localTracks, setLocalTracks] = useState<LocalTrack[]>([]);

  /**
   * @function createLocalTracks
   * @description Creates local audio and video tracks for the user
   * @param none
   * @returns {Promise<LocalTrack[]>} A promise that resolves with an array of local tracks
   */
  const createLocalTracks = useCallback(async () => {
    const tracks = await Video.createLocalTracks({
      audio: true,
      video: { width: 640 },
    });
    setLocalTracks(tracks);
    return tracks;
  }, []);

  /**
   * @function connectToRoom
   * @description Connects the user to a Twilio video room with the provided username and room name
   * @param {string} userName - The username of the participant
   * @param {string} roomName - The name of the room to join
   * @returns {void}
   */
  const connectToRoom = useCallback(
    async (userName: string, roomName: string) => {
      setState((prevState) => ({ ...prevState, connecting: true }));

      try {
        const response = await fetch("http://localhost:3001/video/token", {
          method: "POST",
          body: JSON.stringify({
            identity: userName,
            room: roomName,
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

        const tracks =
          localTracks.length > 0 ? localTracks : await createLocalTracks();

        Video.connect(data.token, {
          name: roomName,
          tracks: tracks,
        } as ConnectOptions)
          .then((room: Room) => {
            setState((prevState) => ({
              ...prevState,
              connecting: false,
              room,
            }));
            localStorage.setItem("userName", userName);
            localStorage.setItem("roomName", roomName);
          })
          .catch((err) => {
            console.error("Error connecting to video room:", err);
            setState((prevState) => ({ ...prevState, connecting: false }));
          });
      } catch (error) {
        console.error("Error fetching token:", error);
        setState((prevState) => ({ ...prevState, connecting: false }));
      }
    },
    [localTracks, createLocalTracks]
  );

  /**
   * @function handleUserNameChange
   * @description Updates the username in the component state when the input changes
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event
   * @returns {void}
   */
  const handleUserNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({ ...prevState, userName: event.target.value }));
    },
    []
  );

  /**
   * @function handleRoomNameChange
   * @description Updates the room name in the component state when the input changes
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event
   * @returns {void}
   */
  const handleRoomNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({ ...prevState, roomName: event.target.value }));
    },
    []
  );

  /**
   * @function handleSubmit
   * @description Handles the form submission to join a video room
   * @param {React.FormEvent} event - The form submission event
   * @returns {void}
   */
  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      connectToRoom(state.userName, state.roomName);
    },
    [state.userName, state.roomName, connectToRoom]
  );

  /**
   * @function handleLogout
   * @description Handles the logout process, disconnects from the room and clears local storage
   * @param none
   * @returns {void}
   */
  const handleLogout = useCallback(() => {
    const userConfirmed = window.confirm("Are you sure you want to logout?");
    if (userConfirmed) {
      setState((prevState) => {
        const prevRoom = prevState.room;
        if (prevRoom) {
          prevRoom.localParticipant.tracks.forEach(
            (trackPub: TrackPublication) => {
              const track = trackPub.track;
              if (
                track.kind === TRACK_KIND_VIDEO ||
                track.kind === TRACK_KIND_AUDIO
              ) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (track as any).stop();
              }
            }
          );
          prevRoom.disconnect();
        }
        return { userName: "", roomName: "", room: null, connecting: false };
      });
      localStorage.removeItem("userName");
      localStorage.removeItem("roomName");
    }
  }, []);

  // Cleanup on component unmount
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
  }, [state.room, handleLogout, state]);

  // Automatically connect to room on initial load if username and roomname are available
  useEffect(() => {
    if (state.userName && state.roomName && !state.room) {
      connectToRoom(state.userName, state.roomName);
    }
  }, [state.userName, state.roomName, state.room, connectToRoom]);

  return (
    <>
      {state.connecting ? (
        <Loader />
      ) : state.room ? (
        <RoomComponent
          roomName={state.roomName}
          room={state.room}
          handleLogout={handleLogout}
        />
      ) : (
        <Form
          userName={state.userName}
          roomName={state.roomName}
          handleUserNameChange={handleUserNameChange}
          handleRoomNameChange={handleRoomNameChange}
          handleSubmit={handleSubmit}
          connecting={state.connecting}
        />
      )}
    </>
  );
};

export default VideoCallModule;
