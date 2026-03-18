import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import bird from "../../img/bird.png";

const OmBlaameisenPanel = () => {
  return (
    <Stack gap={2} justifyContent="center" textAlign="center">
      <img src={bird} alt="" style={{ mixBlendMode: "darken" }} />
      <Typography component={"h1"} variant="subtitle1" fontWeight={"bold"}>
        Om blåmeisen
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
        Vi er så heldige som har fått besøk av blåmeisen! Blåmeisen er en
        akrobatisk liten kar på kun 10 gram, men til tross for størrelsen lar
        den seg ikke pelle på nesen og jager helt usjenert bort større fugler.
        Den spiser insekter og edderkopper på sommeren og frø på vinteren.
      </Typography>
    </Stack>
  );
};

export default OmBlaameisenPanel;
