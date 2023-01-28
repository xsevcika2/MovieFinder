import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Detail from "../../pages/Detail/Detail";
import MyFavorites from "../../pages/MyFavorites/MyFavorites";
import NotFound from "../../pages/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<Detail />} />
      <Route path="/my-favorites" element={<MyFavorites />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
