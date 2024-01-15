import styled from "styled-components";

const RoomContainer = styled.div`
  position: relative;
`;

const RoomButton = styled.button`
  position: absolute;
  top: 0;
  right: 20px;

  background: #333e5a;
  color: #fff;
  font-size: 16px;
  padding: 0.4em;
  border-radius: 6px;
  border: 1px solid transparent;

  &:hover {
    filter: brightness(150%);
  }
`;

const RoomH3 = styled.h3`
  text-align: center;
  font-weight: 300;
  margin-bottom: 1em;
`;

const RoomH2 = styled.h2`
    text-align:center;
`;

const LocalParticipant = styled.div`
  text-align: center;
  margin-bottom: 2em;
`;

const RemoteParticipants = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 0 2em 2em;
`;

export {RoomContainer, RoomButton, RoomH3, RoomH2, LocalParticipant, RemoteParticipants}