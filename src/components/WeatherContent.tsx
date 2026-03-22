import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import type { DayPartsForecast } from "../helpers/yrWeather";
import { getWeatherIconUrl } from "../helpers/weatherIcons";

export type WeatherContentProps = {
  dayPartsWeather: DayPartsForecast | null;
  weatherLoading: boolean;
};

export default function WeatherContent({
  dayPartsWeather,
  weatherLoading,
}: WeatherContentProps) {
  if (weatherLoading || !dayPartsWeather) return null;

  return (
    <Stack
      gap={1}
      sx={{ width: "100%", minWidth: 0 }}
      flexDirection="row"
      justifyContent="space-between"
    >
      {dayPartsWeather.parts.map((part) => {
        const iconSrc = getWeatherIconUrl(part.symbolCode);
        return (
          <Stack
            key={part.id}
            direction="column"
            alignItems="center"
            sx={{ minWidth: 0, flex: "1 1 0" }}
          >
            <Box
              component="img"
              src={iconSrc}
              alt=""
              loading="lazy"
              decoding="async"
              sx={{ width: 26, height: 26, flexShrink: 0 }}
            />
            <Stack alignItems="center" textAlign="center">
              <Typography variant="caption" fontSize="0.75rem">
                {part.timeRangeLabel}
              </Typography>
              <Typography variant="caption">{part.symbolLabel}</Typography>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}
