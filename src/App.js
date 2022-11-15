import { Routes, Route } from "react-router-dom";

import Answer from "./views/Answer";
import Game from "./views/Game";
import NotFound from "./views/NotFound";
import Main from "./views/Main";
import Menu from "./views/Menu";

const App = () => (
  <Routes>
    <Route index element={<Main />} />
    <Route path="/menu" element={<Menu />} />
    <Route path="/menu/:menu_id/game" element={<Game />} />
    <Route path="/menu/:menu_id/answer" element={<Answer />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
export default App;
