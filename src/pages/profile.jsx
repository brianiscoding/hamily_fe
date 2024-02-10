import React, { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import "./ranking.css";
import axios from "axios";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";

import { useOutletContext } from "react-router-dom";
import Profile_Card from "../components/profile.jsx";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import BarChartIcon from "@mui/icons-material/BarChart";

const Profile = () => {
  const [user, logout] = useOutletContext();

  // useEffect(() => {
  //   console.log(user);
  // }, []);

  return (
    <Box
      sx={{
        width: "600px",
        margin: "auto",
        mt: "20px",
      }}
    >
      {user ? (
        <Stack sx={{}} alignItems="center" spacing={2}>
          <Box
            sx={{
              bgcolor: "",
              borderRadius: 2,
              border: 1,
              borderColor: "grey.500",
            }}
          >
            <Profile_Card student={user} />
          </Box>

          <Divider sx={{ width: 1 }} />

          <Stack
            sx={{ width: 1 }}
            direction="row"
            justifyContent="space-evenly"
          >
            <Button
              sx={{ width: 1 }}
              href="/profile/stats"
              startIcon={<BarChartIcon />}
            >
              Stats
            </Button>
            <Button
              sx={{ width: 1 }}
              href="/profile/edit"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            {/* <Button
              sx={{ width: 1 }}
              href="/profile/settings"
              startIcon={<EditIcon />}
            >
              Settings
            </Button> */}
            <Button
              sx={{ width: 1 }}
              onClick={logout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Stack>

          <Box sx={{ width: 1 }}>
            <Outlet context={[user]} />
          </Box>
        </Stack>
      ) : (
        <Typography variant="h1">Loading...</Typography>
      )}
    </Box>
  );
};

export default Profile;
