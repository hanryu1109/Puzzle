import styled from "styled-components";
import GridBackground from "../components/GridBackground/GridBackground.jsx";

const NotFound = () => (
  <Wrapper>
    <GridBackground />
    <Title>404, NOT FOUND</Title>
  </Wrapper>
);

const Wrapper = styled.div`
  height: 100vh;
  background: linear-gradient(to top, #010001, #310140);
`;

const Title = styled.h1`
  color: yellow;
  text-align: center;
  line-height: 1;
  margin-bottom: 2rem;
  background-image: linear-gradient(-250deg, #ee05ff 0%, #fff800 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textClip 2s linear infinite;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;

  @keyframes textClip {
    to {
      background-position: 200% center;
    }
  }
`;
export default NotFound;
