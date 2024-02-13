import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { isMobile } from "react-device-detect";

const Profile = ({ student }) => {
  return (
    <Stack sx={isMobile ? m_card : d_card}>
      <Typography
        variant="h6"
        style={{
          fontWeight: 600,
          display: "-webkit-box",
          overflow: "hidden",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 1,
        }}
      >
        {student.first} {student.last}
      </Typography>

      <Typography sx={{ fontSize: 16, height: "100px" }}>
        {student.bio}
      </Typography>
      <Stack sx={{ justifyContent: "space-around" }} direction="row">
        <Stack>
          <Typography align="center">{student.known_bys}</Typography>
          <Typography align="center" sx={{ fontSize: 12 }}>
            received
          </Typography>
        </Stack>
        <Stack>
          <Typography align="center">{student.knows}</Typography>
          <Typography align="center" sx={{ fontSize: 12 }}>
            casted
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Profile;

const m_card = {
  width: 270,
  height: 170,
  px: "20px",
};
const d_card = {
  width: 270,
  height: 170,
  px: "20px",
};
