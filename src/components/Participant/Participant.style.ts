// Import the 'styled' function from 'styled-components'
import styled from "styled-components";

// Style for the Particpant component
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

const ParticipantHeading3 = styled.h3`
  text-align: center;
  padding-bottom: 0.5em;
  color: #fff;
`;

// Export the styled components for use in other parts of your application
export { ParticipantContainer, ParticipantHeading3 };
