import { useState, useEffect, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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

import Cookies from "js-cookie";
import axios from "axios";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import { isMobile } from "react-device-detect";

const Layout = () => {
  const navigate = useNavigate();
  const [user, set_user] = useState();
  // const navigate = useNavigate();

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

  // if (isMobile)
  if (isMobile)
    return (
      <Stack
        sx={{ height: "100vh", width: "100vw", bgcolor: "#121212", pt: "20px" }}
      >
        <Stack
          direction="row"
          sx={{
            width: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            startIcon={<MenuIcon />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          />
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

          <Typography variant="h6">TheSocNet</Typography>

          {user ? (
            <Button href="/profile/stats" startIcon={<AccountBoxIcon />} />
          ) : (
            <Button onClick={first_login}>Login</Button>
          )}
        </Stack>

        <Box
          sx={{
            width: 1,
            px: 1,
            height: 1,
            overflow: "auto",
          }}
          id="main"
        >
          <Outlet context={[user, login, logout]} />
        </Box>
      </Stack>
    );

  return (
    <Stack
      direction="row"
      sx={{ height: "100vh", width: "100vw", bgcolor: "#121212" }}
    >
      <Stack
        sx={{ pl: "10px", height: "100vh", width: 150 }}
        alignItems="flex-start"
      >
        {/* <Button sx={{ height: 40 }} href="/">
          Logo
        </Button> */}
        <Typography variant="h5" sx={{ fontFamily: "Monospace" }}>
          TheSocNet
        </Typography>
        <Button startIcon={<HomeIcon />} sx={{ height: 40 }} href="/">
          Home
        </Button>
        <Button
          startIcon={<EmojiEventsIcon />}
          sx={{ height: 40 }}
          href="/ranking/all"
        >
          Ranking
        </Button>

        {user ? (
          <Stack alignItems="flex-start">
            <Button
              startIcon={<HowToVoteIcon />}
              sx={{ height: 40 }}
              href="/vote/freshman/new"
            >
              Vote
            </Button>
            <Button
              startIcon={<AccountBoxIcon />}
              sx={{ height: 40 }}
              href="/profile/stats"
            >
              Profile
            </Button>
            <Button
              startIcon={<LogoutIcon />}
              sx={{ height: 40 }}
              href="/"
              onClick={logout}
            >
              Logout
            </Button>
          </Stack>
        ) : (
          <Button
            startIcon={<LoginIcon />}
            sx={{ height: 40, width: "auto" }}
            onClick={first_login}
          >
            Login
          </Button>
        )}
      </Stack>
      <Divider orientation="vertical" />
      <Box
        sx={{
          width: 1,
          px: 2,
          maxHeight: "100vh",
          overflow: "auto",
        }}
        id="main"
      >
        <Outlet context={[user, login, logout, isMobile]} />
      </Box>
    </Stack>
  );
};

export default Layout;
