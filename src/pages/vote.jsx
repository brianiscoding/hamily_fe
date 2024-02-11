import { useState, useEffect, useCallback } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Cookies from "js-cookie";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import StarBorderIcon from "@mui/icons-material/StarBorder";
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
    <Stack sx={{ width: 1 }}>
      <Typography variant="h1">Voting</Typography>

      <Stack
        sx={{ height: "40px" }}
        direction="row"
        justifyContent="space-between"
      >
        <Stack direction="row">
          {["Freshman", "Sophomore", "Junior", "Senior"].map((e, i) => (
            <Button
              onClick={() => navigate(`/vote/${e.toLowerCase()}/${new_old}`)}
              key={e}
              variant={`${e.toLowerCase() === year ? "outlined" : ""}`}
            >
              {e}
            </Button>
          ))}
        </Stack>

        <Stack direction="row">
          {["New", "Old"].map((e, i) => (
            <Button
              variant={`${e.toLowerCase() === new_old ? "outlined" : ""}`}
              onClick={() => navigate(`/vote/${year}/${e.toLowerCase()}`)}
              key={e}
            >
              {e}
            </Button>
          ))}
        </Stack>
      </Stack>

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
  );
};

export default Vote;
