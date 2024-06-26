import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { isMobile } from "react-device-detect";

const Loading = () => {
  return (
    <Stack sx={{ pb: "100px" }}>
      <Typography variant={`${isMobile ? "h4" : "h1"}`}>Loading...</Typography>
      <Typography sx={{ fontSize: `${isMobile ? "16" : "20"}px` }}>
        Since TheSocNet uses free servers (we have no money), loading takes a
        long time sometimes. Give it a few mins! Thanks.
      </Typography>
    </Stack>
  );
};

export default Loading;
