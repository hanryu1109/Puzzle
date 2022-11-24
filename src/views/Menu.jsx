import { useState, useEffect } from "react";
import { Motion, spring } from "react-motion";
import { useNavigate } from "react-router-dom";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";
import styled from "styled-components";

import GridBackground from "../components/GridBackground/GridBackground.jsx";

const Menu = () => {
  const [puzzleImgIndex, setPuzzleImgIndex] = useState(0);
  const [isPrevButtonActive, setIsPrevButtonActive] = useState(false);
  const [isNextButtonActive, setIsNextButtonActive] = useState(true);

  const imgIndexList = [...Array(12).keys()].map((key) => key + 1);

  const navigate = useNavigate();

  const goGamePage = (index) => {
    navigate(index + "/game");
  };

  const showPrevImg = () => {
    if (puzzleImgIndex === 0) {
      return;
    }

    setPuzzleImgIndex(puzzleImgIndex - 1);
  };

  const showNextImg = () => {
    if (puzzleImgIndex === imgIndexList.length - 1) {
      return;
    }

    setPuzzleImgIndex(puzzleImgIndex + 1);
  };

  useEffect(() => {
    if (puzzleImgIndex === 0) {
      setIsPrevButtonActive(false);
    } else if (puzzleImgIndex === imgIndexList.length - 1) {
      setIsNextButtonActive(false);
    } else {
      setIsPrevButtonActive(true);
      setIsNextButtonActive(true);
    }
  }, [puzzleImgIndex]);

  return (
    <Wrapper>
      <GridBackground />
      <Container>
        <h2>
          Choose Puzzle Image <br />
          And Click it!
        </h2>
        <div className="menu-wrap">
          <Motion style={{ left: spring(puzzleImgIndex * 100) }}>
            {({ left }) => (
              <ul className="menu" style={{ left: `-${left}%` }}>
                {imgIndexList.map((index) => (
                  <li
                    key={index}
                    className="puzzle-img"
                    onClick={() => {
                      goGamePage(index);
                    }}>
                    <img
                      src={"../assets/img/image" + index + ".jpeg"}
                      alt="image"
                    />
                  </li>
                ))}
              </ul>
            )}
          </Motion>
        </div>
        <span>{puzzleImgIndex + 1} / 12</span>
        <div className="arrow">
          <VscTriangleLeft
            className={isPrevButtonActive ? "" : "disabled"}
            onClick={showPrevImg}
          />
          <VscTriangleRight
            className={isNextButtonActive ? "" : "disabled"}
            onClick={showNextImg}
          />
        </div>
      </Container>
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
  color: #ffff00;
  text-align: center;

  & h2 {
    font-size: 30px;
    margin-bottom: 30px;
  }

  & span {
    font-size: 20px;
  }

  & .menu-wrap {
    width: 400px;
    height: 400px;
    overflow: hidden;
    margin-bottom: 30px;
    border-radius: 20px;
    border: 10px solid #9b21d8;
    position: relative;
  }

  & .menu {
    width: 4800px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
  }

  & .menu .puzzle-img {
    width: 400px;
    height: 400px;
    background: #ffffff;
    border-radius: 10px;
    text-align: center;
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
    cursor: pointer;
  }

  & .arrow .disabled {
    color: gray;
  }
`;

export default Menu;
