import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { isMobile } from "react-device-detect";

const Home = () => {
  return (
    <Stack>
      <Typography variant={`${isMobile ? "h4" : "h1"}`}>Welcome!</Typography>
      <Typography sx={{ fontSize: `${isMobile ? "16" : "20"}px` }}>
        What is TheSocNet?
        <br />
        A poorly made website that aims to visualize the relationships between
        students at Hamilton College.
        <br />
        <br />
        How does it work?
        <br />
        First sign in with your school email. This way, every vote is from a
        registered student and not some rando. Then vote!
        <br />
        Voting <ClearIcon /> means you don't know them at all.
        <br />
        Voting <StarBorderIcon /> means you know them well, like your friends.
        <br />
        Voting <CheckIcon /> means you know them, but not that well. Like
        someone you worked with once or someone you met at a party. This is
        super vague and up to you!
        <br />
        <br />
        Who is on the rankings?
        <br />
        People that are voted the most well known or known by others. Keep in
        mind, this doesn't necessarily imply the person is bad or good. We don't
        encourage bullying.
        <br />
        <br />
        Why is it so poorly made?
        <br />
        I'm an amateur with very little experience and I made this during my
        sparetime. Hopefully, everything should be intuitive and easy to use.
        <br />
        <br />
        Where do I send my complaints or concerns or compliments?
        <br />
        To your momma's house ;) or Yodel, either works. Now peace! :)
      </Typography>
    </Stack>
  );
};

export default Home;
