import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import type { CurrentHourForecast } from "../helpers/yrWeather";
import { getWeatherIconUrl } from "../helpers/weatherIcons";

export type WeatherCurrentHourProps = {
  currentHour: CurrentHourForecast | null;
  weatherLoading: boolean;
};

export default function WeatherCurrentHour({
  currentHour,
  weatherLoading,
}: WeatherCurrentHourProps) {
  if (weatherLoading || !currentHour) return null;

  const iconSrc = getWeatherIconUrl(currentHour.symbolCode);

  return (
    <Stack direction="column" alignItems="center" sx={{ width: "100%" }}>
      <Stack alignItems="center" textAlign="center" gap={0.25}>
        <Typography variant="subtitle1" fontWeight={"bold"}>
          Været akkurat nå:
        </Typography>
        <Typography variant="caption">{currentHour.symbolLabel}</Typography>
        <Box
          component="img"
          src={iconSrc}
          alt=""
          sx={{ width: 36, height: 36, flexShrink: 0 }}
        />
      </Stack>
    </Stack>
  );
}
