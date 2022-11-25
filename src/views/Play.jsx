import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdDashboardCustomize } from "react-icons/md";

import Board from "../components/Board/Board.jsx";
import Button from "../components/Button/Button.jsx";
import GridBackground from "../components/GridBackground/GridBackground.jsx";

const Play = () => {
  const navigate = useNavigate();

  const { menuId } = useParams();
  const imgUrl = `../../assets/img/image${menuId}.jpeg`;

  const goMenuPage = () => {
    navigate("/menu");
  };

  const goComparePage = () => {
    navigate("/menu/" + menuId + "/compare");
  };

  return (
    <Wrapper>
      <GridBackground />
      <Container>
        <Board imgUrl={imgUrl} gridSize={3} boardSize={600} />
        <Button text="COMPARE SHORTEST PATH" onClick={goComparePage}></Button>
      </Container>
      <MdDashboardCustomize onClick={goMenuPage} />
      <AnswerPicture imgUrl={imgUrl} />
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
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

const AnswerPicture = styled.div`
  position: absolute;
  right: 50px;
  bottom: 50px;
  font-size: 60px;
  background: #ffff00;
  width: 150px;
  height: 150px;
  border-radius: 20px;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
`;

export default Play;
