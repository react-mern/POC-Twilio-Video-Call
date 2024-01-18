// Import the 'styled' function from 'styled-components'
import styled from "styled-components";

// Styled container for individual participant with specific styling
const ParticipantContainer = styled.div`
  background: #333e5a;
  padding: 10px;
  border-radius: 6px;
  display: inline-block;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`;

// Styled heading (H3) for participant with specific text alignment and color
const ParticipantHeading3 = styled.h3`
  text-align: center;
  padding-bottom: 0.5em;
  color: #fff;
`;

// Export the styled components for use in other parts of your application
export { ParticipantContainer, ParticipantHeading3 };
