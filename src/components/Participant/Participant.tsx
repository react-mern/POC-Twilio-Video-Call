import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  ParticipantContainer,
  ParticipantHeading3,
} from "@src/components/Participant/Participant.style";
import {
  RemoteParticipant,
  RemoteTrackPublication,
  LocalTrack,
  RemoteTrack,
  LocalTrackPublication,
  LocalParticipant,
} from "twilio-video";
import { TRACK_KIND_AUDIO, TRACK_KIND_VIDEO } from "@src/constants/trackType";

interface ParticipantProps {
  participant: RemoteParticipant | LocalParticipant;
}

type TrackPublication = LocalTrackPublication | RemoteTrackPublication;

type TrackType = LocalTrack | RemoteTrack;

const Participant: React.FC<ParticipantProps> = ({ participant }) => {
  // State to track video and audio tracks for the participant
  const [videoTracks, setVideoTracks] = useState<TrackType[]>([]);
  const [audioTracks, setAudioTracks] = useState<TrackType[]>([]);

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
      if (track.kind === TRACK_KIND_VIDEO) {
        setVideoTracks((prevVideoTracks) => [...prevVideoTracks, track]);
      } else if (track.kind === TRACK_KIND_AUDIO) {
        setAudioTracks((prevAudioTracks) => [...prevAudioTracks, track]);
      }
    };

    // Event handler for track unsubscription
    const trackUnsubscribed = (track: LocalTrack) => {
      if (track.kind === TRACK_KIND_VIDEO) {
        setVideoTracks((prevVideoTracks) =>
          prevVideoTracks.filter((v) => v !== track)
        );
      } else if (track.kind === TRACK_KIND_AUDIO) {
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
  }, [participant, setVideoTracks, setAudioTracks]);

  // useEffect to handle video track attachment and detachment
  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack && videoRef.current) {
      if (videoTrack.kind === TRACK_KIND_VIDEO) {
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
      if (audioTrack.kind === TRACK_KIND_AUDIO) {
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
      <ParticipantHeading3>{participant.identity}</ParticipantHeading3>
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
