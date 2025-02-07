import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Common from "./layouts/Common";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LoginForm from "./pages/LoginForm";
import Filmmaker from "./layouts/Filmmaker";
import MakerHome from "./pages/MakerHome";
import CreateProject from "./pages/CreateProject";
import ViewProject from "./pages/ViewProject";
import Applicants from "./pages/Applicants";
import ArtistHome from "./pages/ArtistHome";
import FilmmakerProtectedRoute from "./pages/FilmMakerProtectedRoute";
import { useSelector } from "react-redux";
import MakerAddExp from "./pages/MakerAddExp";
import ArtistProtectedRoute from "./pages/ArtistProtectedRoutes";
import ArtistProjectView from "./pages/ArtistProjectView";
import MakerChat from "./pages/MakerChat";
import UserProfile from "./pages/UserProfile";
import MyProject from "./pages/MyProject";
import ArtistProfile from "./pages/ArtistProfile";
import SearchRes from "./pages/SearchRes";
import UserRecommendations from "./pages/UserRecommendations";

const App = () => {
  const user = useSelector((state) => state.user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Common />}>
          <Route path="/" index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<LoginForm />} />
        </Route>
        <Route
          path="/filmmaker"
          element={<FilmmakerProtectedRoute user={user} />}
        >
          <Route index element={<Filmmaker />} />
          <Route path="home" element={<MakerHome />} />
          <Route path="create" element={<CreateProject />} />
          <Route path="view" element={<ViewProject />} />
          <Route path="add-experience" element={<MakerAddExp />} />
          <Route path="applications/:id" element={<Applicants />} />
          <Route path="search/:title" element={<SearchRes />} />
          <Route path="chat/:id" element={<MakerChat />} />
          <Route path="user/:id" element={<UserProfile />} />
          <Route
            path="recommendations/:projectId"
            element={<UserRecommendations />}
          />
        </Route>
        <Route path="/artist" element={<ArtistProtectedRoute user={user} />}>
          <Route path="home" element={<ArtistHome />} />
          <Route path="project" element={<MyProject />} />
          <Route path="profile" element={<ArtistProfile />} />
          <Route path="single/:id" element={<ArtistProjectView />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
