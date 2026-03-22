import { Collapse, Stack, Typography } from "@mui/material";
import blue_tit_flying from "../img/blue_tit_flying.gif";
import type { DayPartsForecast } from "../helpers/yrWeather";
import WeatherContent from "./WeatherContent";

export type CameraFeedDrawerContentProps = {
  showDelayedContent: boolean;
  dayPartsWeather: DayPartsForecast | null;
  weatherLoading: boolean;
  solarMessage?: string | null;
};

export default function CameraFeedDrawerContent({
  showDelayedContent,
  dayPartsWeather,
  weatherLoading,
  solarMessage,
}: CameraFeedDrawerContentProps) {
  return (
    <Stack gap={2} padding={4} alignItems="center" justifyContent="center">
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
            strøm fra et solcellepanel, og trenger litt solskinn for å lade
            batteriet.
          </Typography>
        </Stack>
        <Stack mt={3} sx={{ width: "100%", minWidth: 0 }}>
          <Typography component={"h1"} variant="subtitle1" fontWeight={"bold"}>
            Været i dag
          </Typography>
          {solarMessage ? (
            <Typography variant="caption" color="text.secondary">
              {solarMessage}
            </Typography>
          ) : null}
          <WeatherContent
            sx={{ pt: 1 }}
            dayPartsWeather={dayPartsWeather}
            weatherLoading={weatherLoading}
          />
        </Stack>
      </Collapse>
    </Stack>
  );
}
