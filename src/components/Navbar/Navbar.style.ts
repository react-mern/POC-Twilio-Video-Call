import styled from 'styled-components';

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
text-align:center;
`;

// const Video = styled.video`
//   width: 100%;
//   max-width: 600px;
//   display: block;
//   margin: 0 auto;
//   border-radius: 6px;
// `;

export {
  Header,
  Heading,
  NavContainer,
  VideoContainer,
};
