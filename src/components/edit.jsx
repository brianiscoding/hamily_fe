import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Edit = () => {
  const [user] = useOutletContext();
  const [bio, set_bio] = useState("Default");
  const [count, set_count] = useState(bio.length);

  const update_bio = (e) => {
    if (count === 100) {
      return;
    }
    set_bio(e.target.value);
    set_count(e.target.value.length);
  };

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Typography variant="h5">Bio</Typography>
        <Typography>{count} / 100</Typography>
      </Stack>
      <TextField
        sx={{ mb: "40px", mt: "5px" }}
        value={bio}
        onChange={update_bio}
        multiline
        maxRows={10}
      />
      <Stack direction="row" spacing={2}>
        <Button sx={{ width: 1 }}>Cancel</Button>
        <Button sx={{ width: 1 }}>Submit</Button>
      </Stack>
    </Stack>
  );
};

export default Edit;
