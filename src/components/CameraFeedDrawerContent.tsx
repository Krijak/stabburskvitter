import { Collapse, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import blue_tit_flying from "../img/blue_tit_flying.gif";
import type { DayPartsForecast } from "../helpers/yrWeather";
import { getWeatherIconUrl } from "../helpers/weatherIcons";

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
        </Stack>
      </Collapse>
    </Stack>
  );
}
