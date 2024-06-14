import React from "react";
import {
  NavContainer,
  Header,
  Heading,
  VideoContainer,
} from "@src/components/Navbar/Navbar.style";
import VideoCallModule from "@src/components/VideoCallModule/VideoCallModule";

//Define Navbar Component which renders the different styled components
const Navbar: React.FC = () => {
  return (
    <>
      <NavContainer>
        <Header>
          <Heading>Twilio Video Call</Heading>
        </Header>
        <VideoContainer>
          <VideoCallModule />
        </VideoContainer>
      </NavContainer>
    </>
  );
};

export default Navbar;
