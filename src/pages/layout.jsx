import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

import Cookies from "js-cookie";
import axios from "axios";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

const Layout = () => {
  const [user, set_user] = useState();

  const login = (token) => {
    Cookies.set("login_attempt", token, { secure: true });
    // check valid login
    axios
      .get("http://localhost:8080/api/auth/login", {
        withCredentials: true,
      })
      .then((data) => {
        Cookies.set("user_access_token", token);
        set_user(data.data);
      })
      .catch((err) => {
        console.error(err.response.data);
      })
      .finally(() => {
        // not sure what glogout does
        googleLogout();
        Cookies.remove("login_attempt");
      });
  };

  const first_login = useGoogleLogin({
    onSuccess: (res) => login(res.access_token),
    onError: (err) => console.error(err),
  });

  const logout = () => {
    // not sure what glogout does
    googleLogout();
    Cookies.remove("user_access_token");
    set_user();
  };

  useEffect(() => {
    const user_access_token = Cookies.get("user_access_token");
    // check for cookie
    if (!user_access_token) {
      // no cookie => no user
      set_user();
      return;
    }

    login(user_access_token);
  }, []);

  return (
    <div className="wrapper_layout">
      <div className="nav">
        <div className="nav_home">
          <Link to="/">home</Link>
        </div>

        <div className="nav_ranking">
          <Link to="/">ranking</Link>
        </div>

        <div className="nav_vote">
          <Link to="/vote">vote</Link>
        </div>

        <div className="nav_profile">
          <Link to="/profile">profile</Link>
        </div>

        {user ? (
          <div>
            <Link to="/profile">{user.name}</Link>
            <button onClick={logout}>logout</button>
          </div>
        ) : (
          <button onClick={first_login}>login</button>
        )}
      </div>

      <div className="main">
        <Outlet context={user} />
      </div>
    </div>
  );
};

export default Layout;
