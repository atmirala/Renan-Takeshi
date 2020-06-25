import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { decideCandidate } from "../functions/axios";

const MainContainer = styled.div`
  border: 1px solid black;
  margin: 5px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-areas:
    "name  age  text text text aprv"
    "coun  prof text text text rjct";
`;

const Name = styled.div`
  grid-area: name;
`;

const ApplicationText = styled.div`
  grid-area: text;
`;
const Age = styled.div`
  grid-area: age;
`;
const Country = styled.div`
  grid-area: coun;
`;

const Profession = styled.div`
  grid-area: prof;
`;

const Approve = styled.button`
  grid-area: aprv;
`;

const Reject = styled.button`
  grid-area: rjct;
`;

const CandidateCard = (props) => {
  const { token, tripId, candidate } = props;

  const handleApproveClick = async () => {
    await decideCandidate(tripId, candidate.id, true, token);
    window.location.reload()
  };

  const handleRejectClick = async () => {
    await decideCandidate(tripId, candidate.id, false, token);
    window.location.reload()
  };

  return candidate ? (
    <MainContainer>
      <Name>{candidate.name}</Name>
      <ApplicationText>{candidate.applicationText}</ApplicationText>
      <Age>{candidate.age}</Age>
      <Country>{candidate.country}</Country>
      <Profession>{candidate.profession}</Profession>
      <Reject onClick={handleRejectClick}>Reject</Reject>
      <Approve onClick={handleApproveClick}>Approve</Approve>
    </MainContainer>
  ) : null;
};

export default CandidateCard;