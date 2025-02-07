import FilmmakerNav from "../components/FilmmakerNav";
import { Outlet } from "react-router-dom";

const Filmmaker = () => {
  return (
    <div>
      <FilmmakerNav />
      <Outlet />
    </div>
  );
};

export default Filmmaker;
