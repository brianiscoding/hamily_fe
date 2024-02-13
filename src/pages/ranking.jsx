import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { isMobile } from "react-device-detect";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Profile from "../components/profile.jsx";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";

import Loading from "../components/loading";

const Rank = () => {
  const [students, set_students] = useState([]);
  const { year } = useParams();
  const navigate = useNavigate();
  const [popover, set_popover] = useState({ id: null, anchor_el: null });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/students/ranking/${year}`)
      .then((data) => set_students(data.data))
      .catch((err) => set_students([]));
  }, [year]);

  if (students.length === 0) {
    return <Loading />;
  }

  if (isMobile)
    return (
      <Stack>
        <Typography variant="h6">Ranking</Typography>
        <Stack direction="row" justifyContent="space-between">
          {["Freshman", "Sophomore", "Junior", "Senior", "All"].map((e, i) => (
            <Button
              onClick={() => navigate(`/ranking/${e.toLowerCase()}`)}
              key={e}
              style={m_btn}
              variant={`${e.toLowerCase() === year ? "outlined" : ""}`}
            >
              {e.substring(0, 3)}
            </Button>
          ))}
        </Stack>

        {students.map((student, i) => (
          <div key={i}>
            <Stack
              onClick={(e) =>
                set_popover({ id: i, anchor_el: e.currentTarget })
              }
            >
              <Box>
                <Box
                  sx={{
                    ...bar,
                    width: `${student.known_bys / students[0].known_bys}`,
                  }}
                >
                  <Typography sx={m_name}>{student.known_bys}</Typography>
                </Box>
                <Typography sx={m_name}>
                  {student.first} {student.last}
                </Typography>
              </Box>
            </Stack>

            <Popover
              open={popover.id === i}
              anchorEl={popover.anchor_el}
              onClose={() => set_popover({ id: null, anchor_el: null })}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box sx={card}>
                <Profile student={student} i={i} />
              </Box>
            </Popover>
          </div>
        ))}
      </Stack>
    );

  return (
    <Stack spacing={2}>
      <Typography variant="h1">Ranking</Typography>

      <Stack direction="row">
        {["Freshman", "Sophomore", "Junior", "Senior", "All"].map((e, i) => (
          <Button
            onClick={() => navigate(`/ranking/${e.toLowerCase()}`)}
            key={e}
            variant={`${e.toLowerCase() === year ? "outlined" : ""}`}
          >
            {e}
          </Button>
        ))}
      </Stack>

      {students.map((student, i) => (
        <Stack direction="row" key={i} spacing={2}>
          <Typography
            sx={d_name}
            align="right"
            onClick={(e) => set_popover({ id: i, anchor_el: e.currentTarget })}
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
            <Box sx={card}>
              <Profile student={student} i={i} />
            </Box>
          </Popover>
          <Box sx={{ width: 1 }}>
            <Box
              sx={{
                ...bar,
                width: `${student.known_bys / students[0].known_bys}`,
              }}
            >
              <Typography sx={d_name}>{student.known_bys}</Typography>
            </Box>
          </Box>
        </Stack>
      ))}
    </Stack>
  );
};

export default Rank;

const m_btn = { maxWidth: "40px", minWidth: "40px", fontSize: 16 };
const card = {
  bgcolor: "black",
  borderRadius: 2,
  border: 1,
  borderColor: "grey.500",
};
const bar = {
  bgcolor: "purple",
  borderRadius: 1,
};
const d_name = {
  pl: "5px",
  fontSize: 20,
  width: 200,
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
};
const m_name = {
  fontSize: 16,
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
};
