import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import stabbur_icon from "../../img/stabbur_icon.svg";
import { Box, Link } from "@mui/material";

const OmStabburskvitterPanel = () => {
  return (
    <Stack gap={2} alignItems="center" textAlign="center">
      <Box width={"5rem"}>
        <img
          src={stabbur_icon}
          alt=""
          style={{ mixBlendMode: "darken" }}
          width={"100%"}
        />
      </Box>
      <Stack gap={1}>
        <Typography component={"h1"} variant="subtitle1" fontWeight={"bold"}>
          Om
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
          Dette er en livestream fra fuglehuset som henger i bakgården til PP14
          og PP15
        </Typography>
      </Stack>
      <Stack gap={1}>
        <Typography component={"h2"} variant="subtitle1" fontWeight={"bold"}>
          Kontakt
        </Typography>
        <Link
          href="mailto:stabburskvitter@gmail.com"
          sx={{ fontSize: "0.75rem" }}
        >
          stabburskvitter@gmail.com
        </Link>
      </Stack>
    </Stack>
  );
};

export default OmStabburskvitterPanel;
