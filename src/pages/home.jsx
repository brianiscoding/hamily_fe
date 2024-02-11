// import { useState, useEffect } from "react";
// import { useOutletContext } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Profile from "../components/profile.jsx";

import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Home = () => {
  return (
    <Stack>
      <Typography variant="h1">Hamily</Typography>
      <Typography>You must login with your school email!</Typography>
      <Typography>
        Voting <ClearIcon /> means you don't know them.
      </Typography>
      <Typography>
        Voting <CheckIcon /> means you know them.
      </Typography>
      <Typography>
        Voting <StarBorderIcon /> means you know them well.
      </Typography>

      <Typography>Check the rankings for interesting results!</Typography>
    </Stack>
  );
};

export default Home;
