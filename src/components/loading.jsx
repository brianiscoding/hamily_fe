import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Loading = () => {
  return (
    <Stack>
      <Typography variant="h1">Loading...</Typography>
      <Typography>
        Since Hamily uses free servers, loading takes a long time sometimes.
        Give it a few mins! Thanks.
      </Typography>
    </Stack>
  );
};

export default Loading;
