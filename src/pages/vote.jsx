import { useState, useEffect, useCallback } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Cookies from "js-cookie";

// import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Divider from "@mui/material/Divider";

import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Profile from "../components/profile.jsx";

const Vote = () => {
  const [students, set_students] = useState([]);
  const [students_max_len, set_students_max_len] = useState(0);
  const [user] = useOutletContext();
  const { year, new_old } = useParams();
  const navigate = useNavigate();

  const fetch_students = useCallback(
    (max) => {
      // optomize by saving in session
      axios
        .get(
          `${process.env.REACT_APP_BE_URL}/students/vote/${year}/${new_old}/${max}`,
          { headers: { user_access_token: Cookies.get("user_access_token") } }
        )
        .then((data) => {
          set_students_max_len(data.data.max);
          set_students(data.data.students);
        })
        .catch((err) => console.error(err));
    },
    [new_old, year]
  );

  useEffect(() => {
    if (!user) {
      set_students([]);
      return;
    }
    fetch_students(30);
  }, [user, year, new_old, fetch_students]);

  const handle_vote = (other, type, i) =>
    axios
      .patch(
        `${process.env.REACT_APP_BE_URL}/students/vote`,
        {
          to: other._id,
          type,
        },
        { headers: { user_access_token: Cookies.get("user_access_token") } }
      )
      .then((data) => {
        if (new_old === "new") {
          set_students(students.filter((e, j) => i !== j));
        } else {
          set_students(
            students.map((e, j) => {
              if (i !== j) {
                return e;
              }
              return { ...e, type };
            })
          );
        }
      })
      .catch((err) => console.error(err));

  const button_style = {
    maxWidth: "40px",
    minWidth: "40px",
    minHeight: "50px",
    maxHeight: "50px",
  };

  return (
    <Stack direction="row" spacing={2}>
      <Stack
        sx={{
          width: 1,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h1" sx={{}}>
          Voting
        </Typography>

        <InfiniteScroll
          dataLength={students.length}
          next={() => fetch_students(students.length + 100)}
          scrollableTarget="main"
          hasMore={students_max_len !== students.length}
          loader={<Typography>Loading...</Typography>}
          endMessage={
            <Typography style={{ textAlign: "center" }}>
              Yay, you have seen it all!
            </Typography>
          }
        >
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
                <Stack direction="row">
                  <Profile student={student} />
                  <Stack
                    sx={{
                      justifyContent: "space-evenly",
                      borderRadius: 2,
                      bgcolor: "",
                    }}
                  >
                    <Button
                      style={button_style}
                      key="one"
                      disabled={student.type === "know_not"}
                      onClick={() => handle_vote(student, "know_not", i)}
                    >
                      <ClearIcon />
                    </Button>
                    <Button
                      style={button_style}
                      key="two"
                      disabled={student.type === "know"}
                      onClick={() => handle_vote(student, "know", i)}
                    >
                      <CheckIcon />
                    </Button>
                    <Button
                      style={button_style}
                      key="three"
                      disabled={student.type === "know_well"}
                      onClick={() => handle_vote(student, "know_well", i)}
                    >
                      <StarBorderIcon />
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
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
          onChange={(e) => navigate(`/vote/${e.target.value}/${new_old}`)}
        >
          {["Freshman", "Sophomore", "Junior", "Senior"].map((e, i) => (
            <MenuItem value={e.toLowerCase()} key={e}>
              {e}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={new_old}
          onChange={(e) =>
            navigate(`/vote/${year}/${e.target.value.toLowerCase()}`)
          }
        >
          {["New", "Old"].map((e, i) => (
            <MenuItem value={e.toLowerCase()} key={e}>
              {e}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Stack>
  );
};

export default Vote;
