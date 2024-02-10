import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const Stats = () => {
  const [user] = useOutletContext();
  return (
    <Stack>
      <Typography variant="h4">So far...</Typography>
      <Typography>You don't know {user.know_not.length} others.</Typography>
      <Typography>You know {user.know.length} others.</Typography>
      <Typography>You know {user.know_well.length} others well.</Typography>

      <Typography>
        You are not known by {user.known_not_by.length} others.
      </Typography>
      <Typography>You are known by {user.known_by.length} others.</Typography>
      <Typography>
        You are known by {user.known_well_by.length} others well.
      </Typography>
    </Stack>
  );
};

export default Stats;
