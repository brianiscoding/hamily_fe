import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import Cookies from "js-cookie";

const Edit = () => {
  const [user, login] = useOutletContext();
  const [bio, set_bio] = useState(user.bio);

  useEffect(() => {
    // set_bio(user.bio);
  }, []);

  const update_bio = (e) => {
    if (e.target.value.length > 100) {
      return;
    }
    set_bio(e.target.value);
  };

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Typography variant="h5">Bio</Typography>
        <Typography>{bio ? bio.length : 0} / 100</Typography>
      </Stack>
      <TextField
        sx={{ mb: "40px", mt: "5px" }}
        value={bio}
        onChange={update_bio}
        multiline
        maxRows={10}
      />
      <Stack direction="row" spacing={2}>
        <Button
          sx={{ width: 1 }}
          disabled={user.bio === bio}
          onClick={() => set_bio(user.bio)}
        >
          Cancel
        </Button>
        <Button
          onClick={() =>
            axios
              .patch(
                `${process.env.REACT_APP_BE_URL}/students/bio`,
                { bio },
                {
                  headers: {
                    user_access_token: Cookies.get("user_access_token"),
                  },
                }
              )
              .then(() => login(Cookies.get("user_access_token")))
              .catch((err) => console.error(err))
          }
          sx={{ width: 1 }}
          disabled={user.bio === bio}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default Edit;
