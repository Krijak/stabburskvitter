import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import stabbur_icon from "../../img/stabbur_icon.svg";
import { Box, Link } from "@mui/material";

const OmStabburskvitterPanel = () => {
  return (
    <Stack gap={2} alignItems="center" justifyContent="center">
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
          Om Stabburskvitter
        </Typography>
        <Typography variant="body2" color="text.secondary" flex={1}>
          Dette er en livestream fra fuglehuset som henger i bakgården til PP14
          og PP15.
        </Typography>
        <Typography variant="body2" color="text.secondary" flex={1}>
          Fuglehuset er egnet for spurver, meiser og finker, og kan også fungere
          som en fuglemater på vinteren!
        </Typography>
      </Stack>
      <Stack gap={1}>
        <Typography component={"h2"} variant="subtitle1" fontWeight={"bold"}>
          Kameraet
        </Typography>

        <Typography variant="body2" color="text.secondary" flex={1}>
          Kameraet i fuglehuset får strøm fra et solcellepanel, og vil derfor
          ikke alltid være tilgjengelig. For ordens skyld er mikrofonen i
          kameraet skrudd av.
        </Typography>
      </Stack>
      <Stack gap={1} width={"100%"}>
        <Typography
          component={"h2"}
          variant="subtitle1"
          fontWeight={"bold"}
          flex={1}
        >
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
