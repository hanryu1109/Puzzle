import styled from "styled-components";
import { MdDashboardCustomize } from "react-icons/md";

import Button from "../components/Button";

const Game = () => {
  const goComparePage = () => {};

  return (
    <Wrapper>
      <GridBackground></GridBackground>
      <Container>
        <div className="board">
          <div className="puzzle-img">1</div>
          <div className="puzzle-img">2</div>
          <div className="puzzle-img">3</div>
          <div className="puzzle-img">4</div>
          <div className="puzzle-img">5</div>
          <div className="puzzle-img">6</div>
          <div className="puzzle-img">7</div>
          <div className="puzzle-img">8</div>
        </div>
        <div className="score">SCORE: 100!!</div>
        <Button text="COMPARE SHORTEST PATH" onClick={goComparePage}></Button>
      </Container>
      <MdDashboardCustomize />
      <AnswerPicture />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  background: linear-gradient(to top, #010001, #310140);

  & > svg {
    position: absolute;
    left: 50px;
    bottom: 50px;
    color: #ffff00;
    font-size: 60px;
    cursor: pointer;
    background: #310140;
    padding: 20px;
    border-radius: 50%;
  }
`;

const GridBackground = styled.div`
  margin: 0 auto;
  position: fixed;
  bottom: 0;
  left: -50%;
  background-image: linear-gradient(
      90deg,
      transparent 0%,
      transparent 90%,
      #ee05ff 100%,
      transparent 90%
    ),
    linear-gradient(
      0deg,
      transparent 90%,
      transparent 90%,
      #ee05ff 100%,
      transparent 0%
    );
  background-size: 160px 30px;
  width: 200vw;
  height: 60vh;
  transform: translate3D(0, 0, 0) perspective(150px) rotateX(45deg);
  perspective-origin: top;

  animation-name: movement;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, transparent, #010001);
  }

  @keyframes movement {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 0% 100%;
    }
  }
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & .board {
    background: #110418;
    min-width: 600px;
    height: 600px;
    margin-bottom: 20px;
    border-radius: 20px;
    border: 10px solid #9b21d8;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 5px;
    box-sizing: border-box;
  }

  & .board .puzzle-img {
    width: 175px;
    height: 175px;
    background: #ffffff;
    border-radius: 10px;
    margin: auto;
    text-align: center;
  }

  & .score {
    text-align: center;
    font-size: 30px;
    color: #ffff00;
    width: 400px;
    margin: 0 auto 15px;
  }

  & button {
    background: #ffff00;
    border: none;
    padding: 0.7rem 2rem;
    border-radius: 20px;
    font-size: 1rem;
    display: block;
    margin: 0 auto;
    cursor: pointer;
  }
`;

const AnswerPicture = styled.div`
  position: absolute;
  right: 50px;
  bottom: 50px;
  font-size: 60px;
  cursor: pointer;
  background: #ffff00;
  width: 150px;
  height: 150px;
  border-radius: 20px;
`;

export default Game;
