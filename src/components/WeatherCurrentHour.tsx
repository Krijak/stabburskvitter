import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import type { CurrentHourForecast } from "../helpers/yrWeather";
import { getWeatherIconUrl } from "../helpers/weatherIcons";

const MET_NO_ICON = (symbolCode: string) =>
  `https://api.met.no/weatherapi/weathericon/2.0/?symbol=${encodeURIComponent(symbolCode)}&content_type=image/png`;

export type WeatherCurrentHourProps = {
  currentHour: CurrentHourForecast | null;
  weatherLoading: boolean;
  /** From Met.no sunrise API: before sunrise / after sunset; hidden while sun is up. */
  solarMessage?: string | null;
};

export default function WeatherCurrentHour({
  currentHour,
  weatherLoading,
  solarMessage,
}: WeatherCurrentHourProps) {
  if (weatherLoading || !currentHour) return null;

  const iconSrc =
    getWeatherIconUrl(currentHour.symbolCode) ??
    MET_NO_ICON(currentHour.symbolCode);

  return (
    <Stack direction="column" alignItems="center" sx={{ width: "100%" }}>
      <Stack alignItems="center" textAlign="center" gap={0.25}>
        <Typography variant="subtitle1" fontWeight={"bold"}>
          Været akkurat nå:
        </Typography>
        {solarMessage ? (
          <Typography variant="caption" color="text.secondary">
            {solarMessage}
          </Typography>
        ) : null}
        <Typography variant="caption">{currentHour.symbolLabel}</Typography>
        <Box
          component="img"
          src={iconSrc}
          alt=""
          loading="lazy"
          decoding="async"
          sx={{ width: 36, height: 36, flexShrink: 0 }}
        />
      </Stack>
    </Stack>
  );
}
