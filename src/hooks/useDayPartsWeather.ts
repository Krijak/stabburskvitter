import { useEffect, useState } from "react";
import {
  fetchSunriseSunset,
  fetchYrCompactForecast,
  formatLocalDateForMetNo,
  solarStatusMessage,
  summarizeCurrentHourForecast,
  summarizeDayPartsForecast,
  timezoneOffsetMetNo,
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
  const [solarMessage, setSolarMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setWeatherLoading(true);
      setWeatherError(null);
      setSolarMessage(null);
      try {
        const now = new Date();
        const dateLocal = formatLocalDateForMetNo(now);
        const offset = timezoneOffsetMetNo(now);

        const [data, sun] = await Promise.all([
          fetchYrCompactForecast(lat, lon),
          fetchSunriseSunset(lat, lon, dateLocal, offset).catch(() => null),
        ]);

        const summary = summarizeDayPartsForecast(
          data.properties?.timeseries,
          now,
        );
        const current = summarizeCurrentHourForecast(
          data.properties?.timeseries,
          now,
        );
        const solar =
          sun &&
          solarStatusMessage(
            now,
            sun.properties?.sunrise?.time,
            sun.properties?.sunset?.time,
          );

        if (!cancelled) {
          setDayPartsWeather(summary);
          setCurrentHourForecast(current);
          setSolarMessage(solar ?? null);
        }
      } catch (e) {
        if (!cancelled) {
          setWeatherError(
            e instanceof Error ? e.message : "Kunne ikke hente værvarsel.",
          );
          setDayPartsWeather(null);
          setCurrentHourForecast(null);
          setSolarMessage(null);
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
    solarMessage,
    weatherLoading,
    weatherError,
  };
}
