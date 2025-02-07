import { Navigate, Outlet } from "react-router-dom";
import ArtistNav from "../components/ArtistNav";

const ArtistProtectedRoute = ({ user }) => {
  if (!user || user.role !== "artist") {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <ArtistNav />
      <Outlet />
    </>
  );
};

export default ArtistProtectedRoute;
