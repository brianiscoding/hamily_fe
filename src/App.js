import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import Ranking from "./pages/ranking";
import Contact from "./pages/contact";
import Nonpage from "./pages/nonpage";

// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ranking" element={<Ranking />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Nonpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// https://www.hamiltonappdev.com
// https://appdev-events.vercel.app/home
