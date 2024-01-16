import styled from "styled-components";

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

const ParticipantH3 = styled.h3`
  text-align: center;
  padding-bottom: 0.5em;
  color: #fff;
`;

export {ParticipantContainer, ParticipantH3};