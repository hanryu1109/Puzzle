import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { MdDashboardCustomize } from "react-icons/md";

import Tile from "../components/Tile/Tile.jsx";
import Button from "../components/Button/Button.jsx";

import { PathContext } from "../context/PathContext";

const Compare = () => {
  const { path1, path2 } = useContext(PathContext);

  const [shortPath, setShortPath] = useState([]);
  const [shortTiles, setShortTiles] = useState(path1[0]);
  const [userPath, setUserPath] = useState(path1);
  const [userTiles, setUserTiles] = useState(path1[0]);

  const [shortMove, setShortMove] = useState(path2.cost);
  const [userMove, setUserMove] = useState(path1.length);

  const imgUrl = "https://plays.org/game/slider-puzzle/img/puzzle/image1.jpg";

  const GRID_SIZE = 3;
  const BOARD_SIZE = 600;

  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);

  const style = {
    minWidth: BOARD_SIZE,
    minHeight: BOARD_SIZE,
  };

  const comparePaths = () => {
    let count = 0;
    setShortMove(count);

    let userCount = 0;
    setUserMove(userCount);

    const userTimer = setInterval(() => {
      setUserTiles(userPath[userCount + 1]);

      userCount++;
      setUserMove(userCount);
      if (userCount === userPath.length) {
        setUserTiles(userPath[userPath.length - 1]);
        clearInterval(userTimer);
        userCount = 0;
      }
    }, 1000);

    const timer = setInterval(() => {
      setShortTiles(shortPath[count].split(""));

      count++;
      setShortMove(count);
      if (count === shortPath.length) {
        clearInterval(timer);
        count = 0;
      }
    }, 1000);
  };

  useEffect(() => {
    const result = [];
    let node = path2;

    while (node.parent !== null) {
      result.push(node.state);
      node = node.parent;
    }

    setShortPath(result.reverse());
  }, []);

  return (
    <Wrapper>
      <GridBackground></GridBackground>
      <Container>
        <div className="boards-wrap">
          <div className="short-path">
            <h3>Move: {shortMove}</h3>
            <ul style={style} className="board">
              {shortTiles?.map((tile, index) => (
                <Tile
                  key={tile}
                  index={index}
                  imgUrl={imgUrl}
                  tile={tile}
                  width={pieceWidth}
                  height={pieceHeight}
                />
              ))}
            </ul>
          </div>
          <div className="user-path">
            <h3>Move: {userMove}</h3>
            <ul style={style} className="board">
              {userTiles?.map((tile, index) => (
                <Tile
                  key={tile}
                  index={index}
                  imgUrl={imgUrl}
                  tile={tile}
                  width={pieceWidth}
                  height={pieceHeight}
                />
              ))}
            </ul>
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

  & .boards-wrap {
    display: flex;
    justify-content: space-between;
    width: 1300px;
  }

  & .boards-wrap h3 {
    color: #ffff00;
    text-align: center;
  }

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

export default Compare;
