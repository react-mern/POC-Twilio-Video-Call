// Import the 'styled' function from 'styled-components'
import styled from "styled-components";

// Style for the Navbar component
const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: #0066b2;
  color: #fff;
  text-align: center;
  flex-grow: 0;
  margin-bottom: 2em;
`;

const Heading = styled.h1`
  font-weight: 400;
  padding: 0.4em 0;
`;

const VideoContainer = styled.div`
  text-align: center;
`;

// Export the styled components for use in other parts of your application
export { Header, Heading, NavContainer, VideoContainer };
