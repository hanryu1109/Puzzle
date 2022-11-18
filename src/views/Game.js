import styled from "styled-components";
import { MdDashboardCustomize } from "react-icons/md";

import Button from "../components/Button";
import Board from "../components/Board/Board";

const Game = () => {
  const goComparePage = () => {};
  const imgUrl = "https://plays.org/game/slider-puzzle/img/puzzle/image1.jpg";

  return (
    <Wrapper>
      <GridBackground></GridBackground>
      <Container>
        <Board imgUrl={imgUrl} />
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
    border-radius: 20px;
    border: 10px solid #9b21d8;
    margin-bottom: 20px;
    padding: 0px;
    position: relative;
    overflow: hidden;
  }

  & .tile {
    position: absolute;
    display: grid;
    place-items: center;
    border: 3px solid #110418;
    box-sizing: border-box;
  }

  & button {
    background: #ffff00;
    border: none;
    padding: 0.7rem 2rem;
    border-radius: 20px;
    font-size: 1rem;
    display: block;
    margin: 0 auto 10px;
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
  background-image: url("../../assets/img/image1.jpeg");
  background-size: cover;
`;

export default Game;
