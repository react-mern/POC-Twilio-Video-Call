// Import the 'styled' function from 'styled-components'
import styled from "styled-components";

// Styled container for the entire room with relative positioning
const RoomContainer = styled.div`
  position: relative;
`;

// Styled button for actions in the room
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

// Styled heading (H3) for room with specific text alignment, font weight, and margin
const RoomHeading3 = styled.h3`
  text-align: center;
  font-weight: 300;
  margin-bottom: 1em;
`;

// Styled heading (H2) for room with centered text alignment
const RoomHeading2 = styled.h2`
  text-align: center;
`;

// Styled container for the local participant with centered text alignment and margin
const LocalParticipantContainer = styled.div`
  text-align: center;
  margin-bottom: 2em;
`;

// Styled container for remote participants with flex display, nowrap, and justified space between
const RemoteParticipantContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 0 2em 2em;
`;

// Export the styled components for use in other parts of your application
export {
  RoomContainer,
  RoomButton,
  RoomHeading3,
  RoomHeading2,
  LocalParticipantContainer,
  RemoteParticipantContainer,
};
