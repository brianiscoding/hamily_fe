import { Outlet, Link } from "react-router-dom";
import "./layout.css";
import logo from "../logo.svg";

const Layout = () => {
  return (
    <div className="wrapper">
      <div className="nav">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="nav1">
          <Link to="/">home</Link>
        </div>

        <div className="nav2">
          <Link to="/projects">projects</Link>
        </div>

        <div className="nav3">
          <Link to="/ranking">ranking</Link>
        </div>

        <div className="nav4">
          <Link to="/contact">contact</Link>
        </div>
      </div>

      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
