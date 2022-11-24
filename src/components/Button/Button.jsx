import PropTypes from "prop-types";
import styled from "styled-components";

export default function Button({ className, disabled, onClick, text }) {
  return (
    <Wrapper className={className} disabled={disabled} onClick={onClick}>
      {text}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  background: #ffff00;
  border: none;
  padding: 0.7rem 2rem;
  border-radius: 20px;
  font-size: 1.8rem;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  box-shadow: 0 10px 0 #d0b134;
  transition: 0.2s;

  &:active {
    transform-origin: 0, 0;
    transform: translate(-50%, 10%);
    box-shadow: 0 2px 0 #d0b134;
  }
`;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  text: "버튼",
};
