import styled from "styled-components";
import PropTypes from "prop-types";

const Modal = ({ children, title, className }) => (
  <Wrapper className={className}>
    <div className="modal-content">
      <h3>{title}</h3>
      {children}
    </div>
  </Wrapper>
);

Modal.propTypes = {
  children: PropTypes.array,
  isActive: PropTypes.bool.isRequired,
  title: PropTypes.string,
  width: PropTypes.number,
};

Modal.defaultProps = {
  width: 400,
  title: "Title",
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.65);
  white-space: pre-line;

  & h3 {
    font-size: 30px;
    margin-bottom: 30px;
  }

  & .modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: #9acd32;
    border-radius: 10px;
    text-align: center;
    padding-bottom: 30px;
    box-sizing: border-box;
  }
`;

export default Modal;
