import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ranking.css";
import axios from "axios";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Profile from "../components/profile.jsx";

const Rank = () => {
  const [loading, set_loading] = useState(true);
  const [students, set_students] = useState([]);
  // const [user] = useOutletContext();
  const { year } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`${process.env.REACT_APP_BE_URL}/students/ranking/${year}`);
    if (!loading) return;
    axios
      .get(`${process.env.REACT_APP_BE_URL}/students/ranking/${year}`)
      .then((data) => set_students(data.data))
      .catch((err) => set_students([]))
      .finally(() => set_loading(true));
  }, [year]);

  return (
    <Stack direction="row" spacing={2}>
      <Stack
        sx={{
          width: 1,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h1" sx={{}}>
          Ranking
        </Typography>

        <Grid container sx={{ justifyContent: "space-evenly" }}>
          {students.map((student, i) => (
            <Grid
              item
              key={i}
              sx={{
                mt: "40px",
                mx: "20px",
                bgcolor: "",
                borderRadius: 2,
                border: 1,
                borderColor: "grey.500",
              }}
            >
              <Profile student={student} i={i} />
            </Grid>
          ))}
        </Grid>
      </Stack>

      <Stack
        sx={{
          height: 300,
          width: 180,
          bgcolor: "",
        }}
      >
        <Select
          sx={{}}
          value={year}
          onChange={(e) => navigate(`/ranking/${e.target.value}`)}
        >
          {["Freshman", "Sophomore", "Junior", "Senior", "All"].map((e, i) => (
            <MenuItem value={e.toLowerCase()} key={e}>
              {e}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Stack>
  );
};

export default Rank;
