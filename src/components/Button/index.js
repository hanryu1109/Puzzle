import PropTypes from "prop-types";

export default function Button({ className, disabled, onClick, text }) {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  text: "버튼",
};
