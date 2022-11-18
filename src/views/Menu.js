import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";

import Portal from "../components/Portal";
import Modal from "../components/Modal";
import Button from "../components/Button";

const Menu = () => {
  const [isActive, setIsActive] = useState(false);
  const [menuId, setMenuId] = useState();

  const navigate = useNavigate();

  const toggleModal = (selectedId) => {
    if (selectedId) {
      setMenuId(selectedId);
    }
    setIsActive(!isActive);
  };

  const goGamePage = (mode) => {
    console.log(mode, menuId);
    toggleModal();
    navigate(menuId + "/game");
  };

  return (
    <Wrapper>
      <GridBackground></GridBackground>
      <Container>
        <ul className="menu">
          <li
            className="puzzle-img"
            onClick={() => {
              toggleModal(1);
            }}>
            <img src="../assets/img/image1.jpeg" alt="image" />
          </li>
          <li className="puzzle-img">2</li>
          <li className="puzzle-img">3</li>
          <li className="puzzle-img">4</li>
          <li className="puzzle-img">5</li>
          <li className="puzzle-img">6</li>
        </ul>
        <div className="arrow">
          <VscTriangleLeft />
          <VscTriangleRight />
        </div>
      </Container>

      {isActive && (
        <Portal>
          <Modal
            className="level-modal"
            onClose={toggleModal}
            title="LEVEL MODE"
            isActive={isActive}>
            <Button
              text="EASY"
              onClick={() => {
                console.log(menuId);
                goGamePage("easy");
              }}
            />
            <Button
              text="HARD"
              onClick={() => {
                goGamePage("hard");
              }}
            />
          </Modal>
        </Portal>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  background: linear-gradient(to top, #010001, #310140);
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
    overflow: hidden;
    cursor: pointer;
  }

  & .menu .puzzle-img img {
    width: 100%;
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
