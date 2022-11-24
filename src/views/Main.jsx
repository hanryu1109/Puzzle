import { useNavigate } from "react-router-dom";
import { Motion, spring } from "react-motion";
import styled from "styled-components";

import Button from "../components/Button/Button";

const Main = () => {
  const navigate = useNavigate();

  const goMenuPage = () => {
    navigate("/menu");
  };

  return (
    <Wrapper>
      <Container>
        <Motion
          defaultStyle={{ fontSize: 1, opacity: 0 }}
          style={{
            opacity: spring(1),
            fontSize: spring(10, { stiffness: 170, damping: 60 }),
          }}>
          {(value) => (
            <div>
              <Title
                style={{
                  fontSize: `${value.fontSize}rem`,
                }}>
                SLIDER
                <br />
                PUZZLE
              </Title>
              <Button
                className="start-button"
                text="START"
                onClick={goMenuPage}
              />
            </div>
          )}
        </Motion>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-image: url("../../assets/background.png");
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
`;

const Title = styled.h1`
  color: yellow;
  text-align: center;
  line-height: 1;
  margin-bottom: 2rem;
`;

export default Main;
