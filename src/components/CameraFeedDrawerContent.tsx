import { Button, Collapse, Dialog, Link, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import blue_tit_flying from "../img/blue_tit_flying.gif";
import type { DayPartsForecast } from "../helpers/yrWeather";
import { getWeatherIconUrl } from "../helpers/weatherIcons";
import { useState } from "react";

export type CameraFeedDrawerContentProps = {
  showDelayedContent: boolean;
  dayPartsWeather: DayPartsForecast | null;
  weatherLoading: boolean;
};

export default function CameraFeedDrawerContent({
  showDelayedContent,
  dayPartsWeather,
  weatherLoading,
}: CameraFeedDrawerContentProps) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Stack gap={2} padding={4} paddingBottom={2} alignItems="center" justifyContent="center">
      <Stack width="6rem" justifyContent="center" alignItems="center">
        <img
          src={blue_tit_flying}
          alt=""
          width="100%"
          style={{ mixBlendMode: "darken" }}
        />
      </Stack>
      <Collapse in={showDelayedContent}>
        <Stack gap={1}>
          <Typography component={"h1"} variant="subtitle1" fontWeight={"bold"}>
            Oida!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
            Vi har ikke kontakt med stabburet vårt akkurat nå! Prøv igjen litt
            senere.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
            Har det vært overskyet i hele dag, kanskje? Kameraet i stabburet får
            strøm fra solceller, og trenger litt solskinn for å lade batteriene.
          </Typography>
        </Stack>
        <Stack mt={3}>
          {!weatherLoading && dayPartsWeather && (
            <Stack
              gap={1}
              sx={{ width: "100%" }}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              {dayPartsWeather.parts.map((part) => {
                const iconSrc = getWeatherIconUrl(part.symbolCode);
                return (
                  <Stack key={part.id} direction="column" alignItems="center">
                    <Box
                      component="img"
                      src={iconSrc}
                      alt=""
                      sx={{ width: 26, height: 26, flexShrink: 0 }}
                    />
                    <Stack alignItems={"center"} textAlign={"center"}>
                      <Typography variant="caption" fontSize={"0.75rem"}>
                        {part.timeRangeLabel}
                      </Typography>
                      <Typography variant="caption">
                        {part.symbolLabel}
                      </Typography>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          )}
          <Link component={Button} sx={{ fontSize: "0.75rem", textAlign: "center", mt: 3 }} onClick={() => setOpenDialog(true)}>Det er sol, hvorfor ser jeg fremdeles ikke noe?</Link>
        </Stack>
      </Collapse>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <Stack p={3} gap={2} maxWidth={"30rem"}>
          <Typography variant="body2">

            Det kan det være mange grunner til! Mest sannsynlig må man bare vente til litt over kl 12, for det er først da solen skinner direkte på solcellepanelet.
          </Typography>

          <Typography variant="body2" >
            Er klokken mer enn 12 og det har vært fint vær, så kan det hende at proxyen er nede, og hele det opplegget er litt teknisk.
          </Typography>
          <Typography variant="body2" >
            Proxyen oversetter rtsp-strømmen
            som kommer fra kameraet til et format som kan brukes til å vise videostrømmen på web. Det kan hende at proxyen har krasjet, at en ip-adresse har endret seg, at Cloudflare er nede,
            eller at pcen som kjører proxyen ikke er koblet på nett.
          </Typography>

          <Typography textAlign={"center"}>
            🤓
          </Typography>
        </Stack>
      </Dialog>
    </Stack>
  );
}
