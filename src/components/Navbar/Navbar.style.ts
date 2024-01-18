// Import the 'styled' function from 'styled-components'
import styled from "styled-components";

// Create a styled container for the navigation elements with flex column layout
const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// Create a styled header element with specific background, color, and text alignment
const Header = styled.header`
  background: #0066b2;
  color: #fff;
  text-align: center;
  flex-grow: 0;
  margin-bottom: 2em;
`;

// Create a styled heading (H1) element with specific font weight and padding
const Heading = styled.h1`
  font-weight: 400;
  padding: 0.4em 0;
`;

// Create a styled container for video elements with centered text alignment
const VideoContainer = styled.div`
  text-align: center;
`;

// Export the styled components for use in other parts of your application
export { Header, Heading, NavContainer, VideoContainer };
