import { useEffect, useState } from "react";
import {
  fetchYrCompactForecast,
  summarizeCurrentHourForecast,
  summarizeDayPartsForecast,
  type CurrentHourForecast,
  type DayPartsForecast,
} from "../helpers/yrWeather";

const DEFAULT_LAT = 59.92;
const DEFAULT_LON = 10.73;

export function useDayPartsWeather(
  lat: number = DEFAULT_LAT,
  lon: number = DEFAULT_LON,
) {
  const [dayPartsWeather, setDayPartsWeather] =
    useState<DayPartsForecast | null>(null);
  const [currentHourForecast, setCurrentHourForecast] =
    useState<CurrentHourForecast | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setWeatherLoading(true);
      setWeatherError(null);
      try {
        const data = await fetchYrCompactForecast(lat, lon);
        const now = new Date();
        const summary = summarizeDayPartsForecast(
          data.properties?.timeseries,
          now,
        );
        const current = summarizeCurrentHourForecast(
          data.properties?.timeseries,
          now,
        );
        if (!cancelled) {
          setDayPartsWeather(summary);
          setCurrentHourForecast(current);
        }
      } catch (e) {
        if (!cancelled) {
          setWeatherError(
            e instanceof Error ? e.message : "Kunne ikke hente værvarsel.",
          );
          setDayPartsWeather(null);
          setCurrentHourForecast(null);
        }
      } finally {
        if (!cancelled) setWeatherLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lat, lon]);

  return {
    dayPartsWeather,
    currentHourForecast,
    weatherLoading,
    weatherError,
  };
}
