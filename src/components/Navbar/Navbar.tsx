import React from 'react'
import {NavContainer, Header, Heading, VideoContainer} from "./Navbar.style"
import VideoCallModule from '../VideoCallModule/VideoCallModule';

const Navbar: React.FC = () => {
  return (
    <>
        <NavContainer>
            <Header>
                <Heading>
                Twilio Video Call
                </Heading>
            </Header>
            <VideoContainer>
              <VideoCallModule />
            </VideoContainer>
        </NavContainer>
    </>
  )
}

export default Navbar;