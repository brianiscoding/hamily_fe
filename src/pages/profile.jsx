import React from "react";
import { Outlet } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { useOutletContext } from "react-router-dom";
import ProfileCard from "../components/profile.jsx";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import BarChartIcon from "@mui/icons-material/BarChart";

const Profile = () => {
  const [user, login, logout, isMobile] = useOutletContext();

  return (
    <Box
      sx={{
        width: `${isMobile ? 1 : "600px"}`,
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
            <ProfileCard student={user} />
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
            <Button
              sx={{ width: 1 }}
              onClick={logout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Stack>

          <Box sx={{ width: 1 }}>
            <Outlet context={[user, login]} />
          </Box>
        </Stack>
      ) : (
        <Typography variant="h1">Loading...</Typography>
      )}
    </Box>
  );
};

export default Profile;
