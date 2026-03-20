import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import birds from "../../img/birds.png";

const Fuglene = () => {
  return (
    <Stack gap={2} justifyContent="center">
      <img src={birds} alt="" style={{ mixBlendMode: "darken" }} />
      <Typography component={"h1"} variant="subtitle1" fontWeight={"bold"}>
        Fuglene
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
        Fuglehuset er laget i samarbeid med ornitologer, og er designet for
        spurver, meiser og finker. Rundt omkring oss har vi mye kjøttmeis,
        blåmeis, pilfink og gråspurv, så vi får krysse fingrene for at en av dem
        vil flytte inn i stabburet vårt!
      </Typography>
    </Stack>
  );
};

export default Fuglene;
