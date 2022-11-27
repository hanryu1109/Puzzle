import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdDashboardCustomize } from "react-icons/md";

import Tile from "../components/Tile/Tile.jsx";
import Button from "../components/Button/Button.jsx";
import GridBackground from "../components/GridBackground/GridBackground.jsx";

import { PathContext } from "../context/PathContext";

const Compare = () => {
  const navigate = useNavigate();
  const { shortestPath, userPath } = useContext(PathContext);

  const [shortPath, setShortPath] = useState();
  const [shortTiles, setShortTiles] = useState(userPath[0]);
  const [userTiles, setUserTiles] = useState(userPath[0]);

  const [shortMove, setShortMove] = useState(userPath.cost);
  const [userMove, setUserMove] = useState(shortestPath.length);

  const [isPlaying, setIsPlaying] = useState(false);

  const { menuId } = useParams();
  const imgUrl = `../../assets/img/image${menuId}.jpeg`;

  const GRID_SIZE = 3;
  const BOARD_SIZE = 600;

  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);

  const style = {
    minWidth: BOARD_SIZE,
    minHeight: BOARD_SIZE,
  };

  const comparePaths = () => {
    setIsPlaying(true);

    let count = 0;
    setShortMove(count);

    let userCount = 0;
    setUserMove(userCount);

    const userTimer = setInterval(() => {
      setUserTiles(userPath[userCount + 1]);

      userCount++;
      setUserMove(userCount);
      if (userCount === userPath.length - 1) {
        setUserTiles(userPath[userPath.length - 1]);
        clearInterval(userTimer);
        setIsPlaying(false);
        userCount = 0;
      }
    }, 500);

    const timer = setInterval(() => {
      setShortTiles(shortPath[count].split(""));

      count++;
      setShortMove(count);
      if (count === shortPath.length) {
        clearInterval(timer);
        count = 0;
      }
    }, 500);
  };

  const goMenuPage = () => {
    navigate("/menu");
  };

  useEffect(() => {
    const result = [];
    let node = shortestPath;

    while (node.parent !== null) {
      result.push(node.state);
      node = node.parent;
    }

    setShortPath(result.reverse());
  }, []);

  return (
    <Wrapper>
      <GridBackground />
      <Container>
        <div className="boards-wrap">
          <div className="short-path">
            <h3>Shortest Path, Move: {shortMove}</h3>
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
            <h3>Your Path, Move: {userMove}</h3>
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
        <Button text="PLAY" disabled={isPlaying} onClick={comparePaths} />
      </Container>
      <MdDashboardCustomize onClick={goMenuPage} />
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
    cursor: pointer;
  }
`;

export default Compare;
