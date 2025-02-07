import { Navigate, Outlet } from "react-router-dom";
import FilmmakerNav from "../components/FilmmakerNav";

const FilmmakerProtectedRoute = ({ user }) => {
  if (!user || user.role !== "filmmaker") {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <FilmmakerNav />
      <Outlet />
    </>
  );
};

export default FilmmakerProtectedRoute;
