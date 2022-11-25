import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { PathContext } from "./context/PathContext";

import NotFound from "./views/NotFound";
import Main from "./views/Main.jsx";
import Menu from "./views/Menu.jsx";
import Play from "./views/Play.jsx";
import Compare from "./views/Compare.jsx";

const App = () => {
  const [shortestPath, setShortestPath] = useState([]);
  const [userPath, setUserPath] = useState([]);

  return (
    <PathContext.Provider
      value={{ shortestPath, setShortestPath, userPath, setUserPath }}>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:menuId/game" element={<Play />} />
        <Route path="/menu/:menuId/compare" element={<Compare />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PathContext.Provider>
  );
};
export default App;
