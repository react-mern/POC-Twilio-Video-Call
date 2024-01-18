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
/**
 * 
 * @param param0 
 * @returns 
 */
const Participant: React.FC<ParticipantProps> = ({ participant }) => {
  const [videoTracks, setVideoTracks] = useState<(LocalTrack | RemoteTrack)[]>([]);
  const [audioTracks, setAudioTracks] = useState<(LocalTrack | RemoteTrack)[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const trackpubsToTracks = (trackMap: Map<string, TrackPublication >) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track): track is RemoteTrack => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track: LocalTrack) => {
      if (track.kind === "video") {
        setVideoTracks((prevVideoTracks) => [...prevVideoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((prevAudioTracks) => [...prevAudioTracks, track]);
      }
    };

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

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack && videoRef.current) {
      if (videoTrack.kind === 'video') {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack && audioRef.current) {
      if (audioTrack.kind === 'audio') {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }
  }, [audioTracks]);

  return (
    <ParticipantContainer>
      <ParticipantH3>{participant.identity}</ParticipantH3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={false} />
    </ParticipantContainer>
  );
};

Participant.propTypes = {
  participant: PropTypes.instanceOf(RemoteParticipant).isRequired,
};

export default Participant;
