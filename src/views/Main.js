import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import backgroundImg from "../assets/background.png";

const Main = () => {
  const navigate = useNavigate();

  const goMenuPage = () => {
    navigate("/menu");
  };

  return (
    <Wrapper>
      <Container>
        <Title>SLIDER PUZZLE</Title>
        <Button className="start-button" text="START" onClick={goMenuPage} />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-image: url(${backgroundImg});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100vh;
  position: relative;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & button {
    background: yellow;
    border: none;
    padding: 0.7rem 2rem;
    border-radius: 20px;
    font-size: 1.8rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }
`;

const Title = styled.h1`
  font-size: 10rem;
  color: yellow;
  text-align: center;
  line-height: 1;
  margin-bottom: 2rem;
`;

export default Main;
