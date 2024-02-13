import { useState, useEffect, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import "./layout.css";
// import logo from "../logo.svg";

import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeIcon from "@mui/icons-material/Home";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import { isMobile } from "react-device-detect";

const Layout = () => {
  const navigate = useNavigate();
  const [user, set_user] = useState();

  const login = useCallback((user_access_token) => {
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
  }, []);
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
    // navigate("/");
  };
  useEffect(() => {
    document.title = "TheSocNet";
    const user_access_token = Cookies.get("user_access_token");
    // check for cookie
    if (user_access_token) login(user_access_token);
    // no cookie => no user
    else logout();
  }, [login]);

  // MOBILE
  const [anchorEl, setAnchorEl] = useState(null);
  const close = (href) => {
    setAnchorEl(null);
    navigate(href);
  };

  if (isMobile)
    return (
      <Stack sx={container}>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={(e) => setAnchorEl(e.currentTarget)}
            style={m_nav_btn}
          >
            <MenuIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => close("/")}>Home</MenuItem>
            <MenuItem onClick={() => close("/ranking/all")}>Ranking</MenuItem>
            {user ? (
              [
                <MenuItem key={0} onClick={() => close("/vote/freshman/new")}>
                  Vote
                </MenuItem>,
                <MenuItem key={1} onClick={() => close("/profile/stats")}>
                  Profile
                </MenuItem>,
                <MenuItem
                  key={2}
                  onClick={() => {
                    close("/");
                    logout();
                  }}
                >
                  Logout
                </MenuItem>,
              ]
            ) : (
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  first_login();
                }}
              >
                Login
              </MenuItem>
            )}
          </Menu>
          <Typography variant="h5">TheSocNet</Typography>
        </Stack>

        <Box sx={content} id="main">
          <Outlet context={[user, login, logout]} />
        </Box>
      </Stack>
    );

  return (
    <Stack direction="row" sx={container}>
      <Stack sx={d_nav}>
        <Typography variant="h6">TheSocNet</Typography>

        <Button startIcon={<HomeIcon />} sx={d_nav_btn} href="/">
          Home
        </Button>
        <Button
          startIcon={<EmojiEventsIcon />}
          sx={d_nav_btn}
          href="/ranking/all"
        >
          Ranking
        </Button>

        {user ? (
          [
            <Button
              key={0}
              startIcon={<HowToVoteIcon />}
              sx={d_nav_btn}
              href="/vote/freshman/new"
            >
              Vote
            </Button>,
            <Button
              key={1}
              startIcon={<AccountBoxIcon />}
              sx={d_nav_btn}
              href="/profile/stats"
            >
              Profile
            </Button>,
            <Button
              key={2}
              startIcon={<LogoutIcon />}
              sx={d_nav_btn}
              href="/"
              onClick={logout}
            >
              Logout
            </Button>,
          ]
        ) : (
          <Button
            startIcon={<LoginIcon />}
            sx={d_nav_btn}
            onClick={first_login}
          >
            Login
          </Button>
        )}
      </Stack>
      <Divider orientation="vertical" />

      <Box sx={content} id="main">
        <Outlet context={[user, login, logout]} />
      </Box>
    </Stack>
  );
};

export default Layout;

const container = {
  height: "100vh",
  width: "100vw",
  bgcolor: "#121212",
};

const d_nav = {
  height: "100vh",
  width: 150,
  alignItems: "flex-start",
  mx: "10px",
};

const m_nav_btn = {
  maxWidth: "30px",
  minWidth: "30px",
  justifyContent: "center",
};
const d_nav_btn = { height: 40, width: 1, justifyContent: "flex-start" };

const content = {
  width: 1,
  height: 1,
  px: "10px",
  overflow: "auto",
};
