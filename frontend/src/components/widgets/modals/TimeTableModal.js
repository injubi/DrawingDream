import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import WeekList from "../timetable/WeekList";

const Wrapper = styled(motion.div)`
  width: 600px;
  height: 600px;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: ${({ theme }) => theme.widgetColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: fit-content;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: black;
  display: flex;
  align-items: end;
  margin-bottom: 20px;
`;

const TimeTableModal = ({ layoutId }) => {
  const onClick = (event) => {
    event.stopPropagation();
  };
  return (
    <Wrapper onClick={onClick} layoutId={layoutId}>
      <Header>
        <Title>시간표</Title>
      </Header>
      <WeekList />
    </Wrapper>
  );
};

export default TimeTableModal;
