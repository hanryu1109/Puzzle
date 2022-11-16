import styled from "styled-components";
import { MdDashboardCustomize } from "react-icons/md";

import Button from "../components/Button";

const Compare = () => {
  const comparePaths = () => {};

  return (
    <Wrapper>
      <GridBackground></GridBackground>
      <Container>
        <div className="boards-wrap">
          <div className="short-path">
            <h3>Move: 12</h3>
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
          </div>
          <div className="user-path">
            <h3>Move: 24</h3>
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
          </div>
        </div>
        <Button text="PLAY" onClick={comparePaths}></Button>
      </Container>
      <MdDashboardCustomize />
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

  /* animation-name: movement; */
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

  & .boards-wrap {
    display: flex;
    justify-content: space-between;
    width: 1100px;
  }

  & .boards-wrap h3 {
    color: #ffff00;
    text-align: center;
  }

  & .board {
    background: #110418;
    min-width: 500px;
    height: 500px;
    margin-bottom: 40px;
    border-radius: 20px;
    border: 10px solid #9b21d8;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 5px;
    box-sizing: border-box;
  }

  & .board .puzzle-img {
    width: 145px;
    height: 145px;
    background: #ffffff;
    border-radius: 10px;
    margin: auto;
    text-align: center;
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

export default Compare;
