import React from 'react'
import {NavContainer, Header, Heading, VideoContainer} from "./Navbar.style"

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

            </VideoContainer>
        </NavContainer>
    </>
  )
}

export default Navbar;