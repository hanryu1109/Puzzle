import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const modal = document.getElementById("modal");

  return createPortal(children, modal);
};

export default Portal;
