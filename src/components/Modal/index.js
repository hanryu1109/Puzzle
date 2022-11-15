import PropTypes from "prop-types";

import "./index.css";

const Modal = ({ children, title, className, onClose }) => {
  const handleModal = (event) => {
    if (event.target !== event.currentTarget) return;

    onClose();
  };

  return (
    <div className={className} onClick={handleModal}>
      <div className="modal-content">
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.array,
  isActive: PropTypes.bool.isRequired,
  title: PropTypes.string,
  width: PropTypes.number,
  onClose: PropTypes.func,
  className: PropTypes.string,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onTouchStart: PropTypes.func,
  onTouchEnd: PropTypes.func,
};

Modal.defaultProps = {
  width: 400,
  title: "Title",
};

export default Modal;
