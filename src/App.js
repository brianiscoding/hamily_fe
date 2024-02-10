import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import Ranking from "./pages/ranking";
import Vote from "./pages/vote";
import Profile from "./pages/profile";
import Nonpage from "./pages/nonpage";
import Stats from "./components/stats";
import Edit from "./components/edit";
import Settings from "./components/settings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ranking/:year" element={<Ranking />} />
          <Route path="vote/:year/:new_old" element={<Vote />} />
          <Route path="profile" element={<Profile />}>
            <Route path="stats" element={<Stats />} />
            <Route path="edit" element={<Edit />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Nonpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// https://www.hamiltonappdev.com
// https://appdev-events.vercel.app/home
