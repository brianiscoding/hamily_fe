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

import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";

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

  const [popover, set_popover] = useState({ id: null, anchor_el: null });

  return (
    <Stack direction="row" spacing={2}>
      <Stack sx={{ width: 1 }} spacing={2}>
        <Typography variant="h1">Ranking</Typography>

        {students.map((student, i) => (
          <Stack direction="row" key={i} spacing={2}>
            <Typography
              sx={{
                width: "200px",
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
              align="right"
              onClick={(e) =>
                set_popover({ id: i, anchor_el: e.currentTarget })
              }
            >
              {student.first} {student.last}
            </Typography>
            <Popover
              open={popover.id === i}
              anchorEl={popover.anchor_el}
              onClose={() => set_popover({ id: null, anchor_el: null })}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box
                sx={{
                  bgcolor: "black",
                  borderRadius: 2,
                  border: 1,
                  borderColor: "grey.500",
                }}
              >
                <Profile student={student} i={i} />
              </Box>
            </Popover>
            <Box sx={{ width: 1 }}>
              <Box
                sx={{
                  width: 100,
                  height: 1,
                  width: `${student.known_bys / students[0].known_bys}`,
                  bgcolor: "purple",
                }}
              />
            </Box>
          </Stack>
        ))}
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
