import styled from "styled-components";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";

const Menu = () => (
  <Wrapper>
    <Grid></Grid>
    <Container>
      <div className="menu">
        <div className="puzzle-img">1</div>
        <div className="puzzle-img">2</div>
        <div className="puzzle-img">3</div>
        <div className="puzzle-img">4</div>
        <div className="puzzle-img">5</div>
        <div className="puzzle-img">6</div>
      </div>
      <div className="arrow">
        <VscTriangleLeft />
        <VscTriangleRight />
      </div>
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  height: 100vh;
  background: linear-gradient(to top, #010001, #310140);
`;

const Grid = styled.div`
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

  & .menu {
    background: #110418;
    min-width: 800px;
    height: 400px;
    margin-bottom: 40px;
    border-radius: 20px;
    border: 10px solid #9b21d8;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  & .menu .puzzle-img {
    width: 100px;
    height: 100px;
    background: #ffffff;
    border-radius: 10px;
    margin: auto;
    text-align: center;
  }

  & .arrow {
    text-align: center;
    font-size: 70px;
    color: #ffff00;
    width: 400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
`;

export default Menu;
