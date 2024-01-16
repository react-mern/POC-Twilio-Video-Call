/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect } from "react";
import Video from "twilio-video";
import Form from "../Form/Form";
import Room from "../Room/Room";

const VideoCallModule: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [room, setRoom] = useState<string>(""); // Replace 'any' with the actual type of your room object
  const [connecting, setConnecting] = useState<boolean>(false);

  const handleUsernameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setConnecting(true);

    try {
      const response = await fetch("http://localhost:3001/video/token", {
        method: "POST",
        body: JSON.stringify({
          identity: username,
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

      Video.connect(data.token, {
        name: roomName,
      })
        .then((newRoom) => {
          setConnecting(false);
          setRoom(newRoom);
        })
        .catch((err) => {
          console.error("Error connecting to video room:", err);
          setConnecting(false);
        });
    } catch (error) {
      console.error("Error fetching token:", error);
      setConnecting(false);
    }
  }, [roomName, username]);

  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub: any) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = (event: BeforeUnloadEvent) => {
        if (event.persisted) {
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
  }, [room, handleLogout]);

  return room ? (
    <Room roomName={roomName} room={room} handleLogout={handleLogout} />
  ) : (
    <Form
      username={username}
      roomName={roomName}
      handleUsernameChange={handleUsernameChange}
      handleRoomNameChange={handleRoomNameChange}
      handleSubmit={handleSubmit}
      connecting={connecting}
    />
  );
};

export default VideoCallModule;
