import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import "./layout.css";
import logo from "../logo.svg";

import Cookies from "js-cookie";
import axios from "axios";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

const Layout = () => {
  const [user, set_user] = useState();

  const login = (user_access_token) => {
    // check valid login
    axios
      .get(`${process.env.REACT_APP_BE_URL}/auth/login`, {
        headers: { user_access_token },
      })

      .then((data) => {
        Cookies.set("user_access_token", user_access_token);
        set_user(data.data);
      })

      .catch((err) => {
        logout();
        console.log(err);
      })

      .finally(() => googleLogout()); // not sure what glogout does
  };

  const first_login = useGoogleLogin({
    onSuccess: (res) => login(res.access_token),
    onError: (err) => {
      logout();
      console.error(err);
    },
  });

  const logout = () => {
    Cookies.remove("user_access_token");
    set_user();
    googleLogout(); // not sure what glogout does
  };

  useEffect(() => {
    const user_access_token = Cookies.get("user_access_token");
    // check for cookie
    if (user_access_token) login(user_access_token);
    // no cookie => no user
    else logout();
  }, []);

  return (
    <div className="wrapper_layout">
      <div className="nav">
        <Link className="nav_logo" to="/">
          <img src={logo} alt="logo" />
        </Link>

        <div className="nav_ranking">
          <Link to="/ranking/all">ranking</Link>
        </div>

        {user ? (
          <>
            <div className="nav_vote">
              <Link to={`/vote/freshman/new`}>vote</Link>
            </div>
            <Link className="nav_profile" to="/profile">
              {user.first} {user.last}
            </Link>

            <div className="knows">
              {user.known_bys} / {user.knows}
            </div>

            <Link className="nav_logout" to="/" onClick={logout}>
              logout
            </Link>
          </>
        ) : (
          <button className="nav_profile" onClick={first_login}>
            login
          </button>
        )}
      </div>

      <div className="main" id="main">
        <Outlet context={[user]} />
      </div>
    </div>
  );
};

export default Layout;
