import React, { useEffect, useState, useRef } from "react";
import {
  ParticipantContainer,
  ParticipantHeading3,
} from "@src/components/Participant/Participant.style";
import { LocalTrack, RemoteTrack } from "twilio-video";
import { TRACK_KIND_AUDIO, TRACK_KIND_VIDEO } from "@src/constants/trackType";
import {
  ParticipantProps,
  ParticipantTrackPublication,
  TrackType,
} from "@src/types/types";

const Participant: React.FC<ParticipantProps> = ({ participant }) => {
  const [videoTracks, setVideoTracks] = useState<TrackType[]>([]);
  const [audioTracks, setAudioTracks] = useState<TrackType[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  /**
   * @function trackpubsToTracks
   * @description Converts a map of track publications to an array of tracks
   * @param {Map<string, ParticipantTrackPublication>} trackMap - The map of track publications
   * @returns {TrackType[]} An array of tracks
   */
  const trackpubsToTracks = (
    trackMap: Map<string, ParticipantTrackPublication>
  ) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track): track is RemoteTrack => track !== null);

  // Effect to handle track subscriptions and unsubscriptions
  useEffect(() => {
    const videoTracks = trackpubsToTracks(participant.videoTracks);
    const audioTracks = trackpubsToTracks(participant.audioTracks);
    setVideoTracks(videoTracks);
    setAudioTracks(audioTracks);

    /**
     * @function trackSubscribed
     * @description Handles the subscription of a new track
     * @param {LocalTrack} track - The track that was subscribed to
     * @returns {void}
     */
    const trackSubscribed = (track: LocalTrack) => {
      if (track.kind === TRACK_KIND_VIDEO) {
        setVideoTracks((prevVideoTracks) => [...prevVideoTracks, track]);
      } else if (track.kind === TRACK_KIND_AUDIO) {
        setAudioTracks((prevAudioTracks) => [...prevAudioTracks, track]);
      }
    };

    /**
     * @function trackUnsubscribed
     * @description Handles the unsubscription of a track
     * @param {LocalTrack} track - The track that was unsubscribed from
     * @returns {void}
     */
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

    // Register event listeners
    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    // Cleanup event listeners on component unmount
    return () => {
      participant.off("trackSubscribed", trackSubscribed);
      participant.off("trackUnsubscribed", trackUnsubscribed);
      setVideoTracks([]);
      setAudioTracks([]);
    };
  }, [participant]);

  // Effect to handle video track attachment and detachment
  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack && videoRef.current) {
      if (videoTrack.kind === TRACK_KIND_VIDEO) {
        videoTrack.attach(videoRef.current);
        return () => {
          if (videoRef.current) {
            videoTrack.detach(videoRef.current);
          }
        };
      }
    }
  }, [videoTracks]);

  // Effect to handle audio track attachment and detachment
  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack && audioRef.current) {
      if (audioTrack.kind === TRACK_KIND_AUDIO) {
        audioTrack.attach(audioRef.current);
        return () => {
          if (audioRef.current) {
            audioTrack.detach(audioRef.current);
          }
        };
      }
    }
  }, [audioTracks]);

  return (
    <ParticipantContainer>
      <ParticipantHeading3>{participant.identity}</ParticipantHeading3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={false} />
    </ParticipantContainer>
  );
};

export default Participant;
