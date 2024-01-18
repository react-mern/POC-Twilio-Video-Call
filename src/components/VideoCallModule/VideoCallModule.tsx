import React, { useState, useCallback, useEffect } from "react";
import Video, {
  Room,
  ConnectOptions,
  LocalTrack,
  RemoteTrack,
  LocalAudioTrack,
  LocalVideoTrack,
} from "twilio-video";
import Form from "../Form/Form";
import RoomComponent from "../Room/RoomComponent";

interface TrackPublication {
  track: LocalTrack | RemoteTrack | LocalAudioTrack | LocalVideoTrack;
}

interface VideoCallModuleState {
  userName: string;
  roomName: string;
  room: Room | null;
  connecting: boolean;
}

interface CustomBeforeUnloadEvent extends Event {
  persisted: boolean;
}

const VideoCallModule: React.FC = () => {
  // State for managing component data
  const [state, setState] = useState<VideoCallModuleState>({
    userName: "",
    roomName: "",
    room: null,
    connecting: false,
  });

  /**
   * @function handleUserNameChange
   * @description updates the userName property when input field is triggered
   */
  const handleUserNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({ ...prevState, userName: event.target.value }));
    },
    []
  );

  /**
   * @function handleRoomNameChange
   * @description updates the roomName property when input field is triggered
   */
  const handleRoomNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({ ...prevState, roomName: event.target.value }));
    },
    []
  );

  /**
   * @function handleSubmit
   * @description handles the submission of the form
   */
  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setState((prevState) => ({ ...prevState, connecting: true }));

      try {
        // to fetch the token from the server
        const response = await fetch("http://localhost:3001/video/token", {
          method: "POST",
          body: JSON.stringify({
            identity: state.userName,
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

        // using Video.connect function of Twilio to connect to a video room
        Video.connect(data.token, {
          name: state.roomName,
        } as ConnectOptions)
          .then((room: Room) => {
            setState((prevState) => ({
              ...prevState,
              connecting: false,
              room,
            }));
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
    [state]
  );

  /**
   * @function handleLogout
   * @description responsible for disconnecting from the current video room and stopping any local audio and video tracks that are active
   */
  const handleLogout = useCallback(() => {
    setState((prevState) => {
      const prevRoom = prevState.room;
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach(
          (trackPub: TrackPublication) => {
            const track = trackPub.track;
            if (track.kind === "video" || track.kind === "audio") {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (track as any).stop();
            }
          }
        );
        // after stopping local tracks, it disconnects from the room
        prevRoom.disconnect();
      }
      return { ...prevState, room: null };
    });
  }, []);

  // responsible for attaching event listeners to the pagehide and beforeunload events to handle cleanup operations when the user navigates away from the page or closes the browser window
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

  // conditionally rendering the component based on the existence of a 'room'
  return state.room ? (
    // Render RoomComponent if there is a room in the state
    <RoomComponent
      roomName={state.roomName}
      room={state.room}
      handleLogout={handleLogout}
    />
  ) : (
    // Render Form component if there is no room in the state
    <Form
      userName={state.userName}
      roomName={state.roomName}
      handleUserNameChange={handleUserNameChange}
      handleRoomNameChange={handleRoomNameChange}
      handleSubmit={handleSubmit}
      connecting={state.connecting}
    />
  );
};

export default VideoCallModule;
