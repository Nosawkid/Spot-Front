import { Outlet } from "react-router-dom";
import ArtistNav from "../components/ArtistNav";

const Artist = () => {
  return (
    <div>
      <ArtistNav />
      <Outlet />
    </div>
  );
};

export default Artist;
