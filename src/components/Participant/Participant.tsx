import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { ParticipantContainer, ParticipantH3 } from "./Participant.style";
import {
  RemoteParticipant,
  RemoteTrackPublication,
  LocalTrack,
  RemoteTrack,
  LocalTrackPublication,
  LocalParticipant,
} from "twilio-video";

interface ParticipantProps {
  participant: RemoteParticipant | LocalParticipant;
}

type TrackPublication = LocalTrackPublication | RemoteTrackPublication;

const Participant: React.FC<ParticipantProps> = ({ participant }) => {
  // State to track video and audio tracks for the participant
  const [videoTracks, setVideoTracks] = useState<(LocalTrack | RemoteTrack)[]>(
    []
  );
  const [audioTracks, setAudioTracks] = useState<(LocalTrack | RemoteTrack)[]>(
    []
  );

  // Refs for video and audio elements
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Function to convert track publications to tracks
  const trackpubsToTracks = (trackMap: Map<string, TrackPublication>) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track): track is RemoteTrack => track !== null);

  // useEffect to handle track subscription and unsubscription
  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    // Event handler for track subscription
    const trackSubscribed = (track: LocalTrack) => {
      if (track.kind === "video") {
        setVideoTracks((prevVideoTracks) => [...prevVideoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((prevAudioTracks) => [...prevAudioTracks, track]);
      }
    };

    // Event handler for track unsubscription
    const trackUnsubscribed = (track: LocalTrack) => {
      if (track.kind === "video") {
        setVideoTracks((prevVideoTracks) =>
          prevVideoTracks.filter((v) => v !== track)
        );
      } else if (track.kind === "audio") {
        setAudioTracks((prevAudioTracks) =>
          prevAudioTracks.filter((a) => a !== track)
        );
      }
    };

    // Attach event listeners to the participant
    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    // Cleanup function
    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  // useEffect to handle video track attachment and detachment
  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack && videoRef.current) {
      if (videoTrack.kind === "video") {
        videoTrack.attach(videoRef.current);
        return () => {
          videoTrack.detach();
        };
      }
    }
  }, [videoTracks]);

  // useEffect to handle audio track attachment and detachment
  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack && audioRef.current) {
      if (audioTrack.kind === "audio") {
        audioTrack.attach(audioRef.current);
        return () => {
          audioTrack.detach();
        };
      }
    }
  }, [audioTracks]);

  // Render the participant component and styled components
  return (
    <ParticipantContainer>
      <ParticipantH3>{participant.identity}</ParticipantH3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={false} />
    </ParticipantContainer>
  );
};

// PropTypes validation for the component props
Participant.propTypes = {
  participant: PropTypes.instanceOf(RemoteParticipant).isRequired,
};

export default Participant;
