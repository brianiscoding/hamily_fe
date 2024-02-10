import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Profile = ({ student }) => {
  return (
    <Stack
      sx={{
        width: 270,
        height: 170,
        px: "20px",
      }}
    >
      <Typography variant="h6" style={{ fontWeight: 600 }}>
        {student.first} {student.last}
      </Typography>

      <Typography sx={{ fontSize: 16, height: "100px" }}>
        Sed ut perspiciatis unde omnis iste natus error sit dolor{" "}
        {student.first} {student.last} {student.first} {student.last}
        {student.first} {student.last} {student.first} {student.last}
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
