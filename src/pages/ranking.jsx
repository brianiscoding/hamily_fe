import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [loading, set_loading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/students/ranking/${year}`)
      .then((data) => {
        set_students(data.data);
        set_loading(false);
      })
      .catch((err) => set_students([]));
  }, [year]);

  const [popover, set_popover] = useState({ id: null, anchor_el: null });

  return loading ? (
    <Loading />
  ) : (
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
            sx={{
              width: "200px",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
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
                height: 1,
                width: `${student.known_bys / students[0].known_bys}`,
                bgcolor: "purple",
                borderRadius: 2,
              }}
            >
              <Typography sx={{ pl: "10px", fontSize: 20 }}>
                {student.known_bys}
              </Typography>
            </Box>
          </Box>
        </Stack>
      ))}
    </Stack>
  );
};

export default Rank;
