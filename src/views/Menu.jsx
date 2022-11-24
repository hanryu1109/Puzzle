import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";

import Portal from "../components/Portal";
import Modal from "../components/Modal";
import Button from "../components/Button/Button.jsx";
import GridBackground from "../components/GridBackground/GridBackground.jsx";

const Menu = () => {
  const [isActive, setIsActive] = useState(false);
  const [menuId, setMenuId] = useState();
  const imgIndexList = [...Array(12).keys()].map((key) => key + 1);

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
      <GridBackground />
      <Container>
        <ul className="menu">
          {imgIndexList.map((index) => (
            <li
              className="puzzle-img"
              onClick={() => {
                toggleModal(index);
              }}>
              <img src={"../assets/img/image" + index + ".jpeg"} alt="image" />
            </li>
          ))}
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
