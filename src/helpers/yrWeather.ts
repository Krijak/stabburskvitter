/**
 * Norwegian Meteorological Institute (Met.no) Locationforecast 2.0 — same data as Yr.
 * @see https://api.met.no/doc/locationforecast/HowTO
 *
 * Terms: identify your app with a valid User-Agent (domain/contact).
 */

const YR_USER_AGENT = "Stabburskvitter/1.0 https://stabburskvitter.no";

export type YrTimeseriesEntry = {
  time: string;
  data: {
    instant?: {
      details?: {
        air_temperature?: number;
        wind_speed?: number;
      };
    };
    next_1_hours?: {
      summary?: { symbol_code?: string };
      details?: { precipitation_amount?: number };
    };
    next_6_hours?: {
      summary?: { symbol_code?: string };
    };
    next_12_hours?: {
      summary?: { symbol_code?: string };
    };
  };
};

export type YrCompactResponse = {
  properties?: {
    timeseries?: YrTimeseriesEntry[];
  };
};

export type TodayForecastSummary = {
  dateLabel: string;
  minTemp: number;
  maxTemp: number;
  symbolCode: string;
  symbolLabel: string;
  precipMm: number;
};

/** Local day slices: before noon, afternoon, evening */
export type DayPartId = "morgen" | "etterMiddag" | "kveld";

export type DayPartSummary = {
  id: DayPartId;
  title: string;
  /** Human-readable local time span this summary covers (Norwegian clock style). */
  timeRangeLabel: string;
  symbolCode: string;
  symbolLabel: string;
  minTemp: number;
  maxTemp: number;
  precipMm: number;
};

export type DayPartsForecast = {
  dateLabel: string;
  parts: DayPartSummary[];
};

const SYMBOL_LABELS_NO: Record<string, string> = {
  clearsky_day: "Klart",
  clearsky_night: "Klart",
  fair_day: "Lettskyet",
  fair_night: "Lettskyet",
  partlycloudy_day: "Delvis skyet",
  partlycloudy_night: "Delvis skyet",
  cloudy: "Overskyet",
  fog: "Tåke",
  lightrain: "Lett regn",
  rain: "Regn",
  heavyrain: "Kraftig regn",
  lightrainandthunder: "Lett regn og torden",
  rainandthunder: "Regn og torden",
  sleet: "Sludd",
  snow: "Snø",
  lightsnow: "Lett snø",
  heavyrainandthunder: "Kraftig regn og torden",
  heavyrainshowers_day: "Kraftige regnbyger",
  heavyrainshowers_night: "Kraftige regnbyger",
  lightrainshowers_day: "Lette regnbyger",
  lightrainshowers_night: "Lette regnbyger",
  rainshowers_day: "Regnbyger",
  rainshowers_night: "Regnbyger",
};

function symbolLabel(code: string): string {
  return SYMBOL_LABELS_NO[code] ?? code.replace(/_/g, " ");
}

function pickSymbol(entry: YrTimeseriesEntry): string | undefined {
  return (
    entry.data.next_1_hours?.summary?.symbol_code ??
    entry.data.next_6_hours?.summary?.symbol_code ??
    entry.data.next_12_hours?.summary?.symbol_code
  );
}

function isSameLocalCalendarDay(isoTime: string, ref: Date): boolean {
  const d = new Date(isoTime);
  return (
    d.getFullYear() === ref.getFullYear() &&
    d.getMonth() === ref.getMonth() &&
    d.getDate() === ref.getDate()
  );
}

function localHour(isoTime: string): number {
  return new Date(isoTime).getHours();
}

function formatDayPartTimeRange(hourMin: number, hourMax: number): string {
  const z = (n: number) => n.toString().padStart(2, "0");
  return `${z(hourMin)}–${z(hourMax + 1)}`;
}

const DAY_PART_WINDOWS: {
  id: DayPartId;
  title: string;
  hourMin: number;
  hourMax: number;
  /** Prefer symbol from forecast step closest to this hour (local) */
  symbolAnchorHour: number;
}[] = [
  {
    id: "morgen",
    title: "Morgen",
    hourMin: 6,
    hourMax: 11,
    symbolAnchorHour: 9,
  },
  {
    id: "etterMiddag",
    title: "Ettermiddag",
    hourMin: 12,
    hourMax: 17,
    symbolAnchorHour: 15,
  },
  {
    id: "kveld",
    title: "Kveld",
    hourMin: 18,
    hourMax: 23,
    symbolAnchorHour: 21,
  },
];

/**
 * Hourly steps for past parts of today are often missing from the compact API.
 * Fall back to the forecast step on the same local day closest to the part's anchor hour.
 */
function entriesForDayPartWindow(
  timeseries: YrTimeseriesEntry[],
  todayEntries: YrTimeseriesEntry[],
  window: (typeof DAY_PART_WINDOWS)[number],
  ref: Date,
): YrTimeseriesEntry[] {
  const slice = todayEntries.filter((e) => {
    const h = localHour(e.time);
    return h >= window.hourMin && h <= window.hourMax;
  });
  if (slice.length > 0) return slice;

  const target = new Date(ref);
  target.setHours(window.symbolAnchorHour, 0, 0, 0);
  const targetMs = target.getTime();

  const dayPool = timeseries.filter((e) => isSameLocalCalendarDay(e.time, ref));
  const pool = dayPool.length > 0 ? dayPool : timeseries;
  if (!pool.length) return [];

  const closest = pool.reduce((best, e) => {
    const t = new Date(e.time).getTime();
    const bestT = new Date(best.time).getTime();
    return Math.abs(t - targetMs) < Math.abs(bestT - targetMs) ? e : best;
  });
  return [closest];
}

function summarizePartEntries(
  entries: YrTimeseriesEntry[],
  symbolAnchorHour: number,
  refDay: Date,
): Omit<DayPartSummary, "id" | "title" | "timeRangeLabel"> | null {
  if (!entries.length) return null;

  const temps: number[] = [];
  for (const e of entries) {
    const t = e.data.instant?.details?.air_temperature;
    if (typeof t === "number") temps.push(t);
  }

  let precipMm = 0;
  for (const e of entries) {
    const p = e.data.next_1_hours?.details?.precipitation_amount;
    if (typeof p === "number" && p > 0) precipMm += p;
  }

  const anchor = new Date(refDay);
  anchor.setHours(symbolAnchorHour, 0, 0, 0);
  const anchorMs = anchor.getTime();
  const symbolEntry = entries.reduce((best, e) => {
    const t = new Date(e.time).getTime();
    const bestT = new Date(best.time).getTime();
    return Math.abs(t - anchorMs) < Math.abs(bestT - anchorMs) ? e : best;
  }, entries[0]);

  const symbolCode = pickSymbol(symbolEntry) ?? "unknown";
  const minTemp = temps.length ? Math.min(...temps) : 0;
  const maxTemp = temps.length ? Math.max(...temps) : minTemp;

  return {
    symbolCode,
    symbolLabel: symbolLabel(symbolCode),
    minTemp: Math.round(minTemp),
    maxTemp: Math.round(maxTemp),
    precipMm: Math.round(precipMm * 10) / 10,
  };
}

export async function fetchYrCompactForecast(
  lat: number,
  lon: number,
): Promise<YrCompactResponse> {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat.toFixed(4)}&lon=${lon.toFixed(4)}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": YR_USER_AGENT,
    },
  });
  if (!res.ok) {
    throw new Error(`Vær-API: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<YrCompactResponse>;
}

export function summarizeTodayForecast(
  timeseries: YrTimeseriesEntry[] | undefined,
  ref: Date = new Date(),
): TodayForecastSummary | null {
  if (!timeseries?.length) return null;

  const todayEntries = timeseries.filter((e) =>
    isSameLocalCalendarDay(e.time, ref),
  );
  if (!todayEntries.length) return null;

  const temps: number[] = [];
  for (const e of todayEntries) {
    const t = e.data.instant?.details?.air_temperature;
    if (typeof t === "number") temps.push(t);
  }

  let precipMm = 0;
  for (const e of todayEntries) {
    const p = e.data.next_1_hours?.details?.precipitation_amount;
    if (typeof p === "number" && p > 0) precipMm += p;
  }

  const noon = new Date(ref);
  noon.setHours(12, 0, 0, 0);
  const symbolEntry = todayEntries.reduce((best, e) => {
    const t = new Date(e.time).getTime();
    const bestT = new Date(best.time).getTime();
    return Math.abs(t - noon.getTime()) < Math.abs(bestT - noon.getTime())
      ? e
      : best;
  }, todayEntries[0]);

  const symbolCode = pickSymbol(symbolEntry) ?? "unknown";

  const minTemp = temps.length ? Math.min(...temps) : 0;
  const maxTemp = temps.length ? Math.max(...temps) : minTemp;

  const dateLabel = ref.toLocaleDateString("nb-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return {
    dateLabel,
    minTemp: Math.round(minTemp),
    maxTemp: Math.round(maxTemp),
    symbolCode,
    symbolLabel: symbolLabel(symbolCode),
    precipMm: Math.round(precipMm * 10) / 10,
  };
}

/**
 * Today's forecast split into Morgen (06–11), Etter middag (12–17), Kveld (18–23) in local time.
 */
export function summarizeDayPartsForecast(
  timeseries: YrTimeseriesEntry[] | undefined,
  ref: Date = new Date(),
): DayPartsForecast | null {
  if (!timeseries?.length) return null;

  const todayEntries = timeseries.filter((e) =>
    isSameLocalCalendarDay(e.time, ref),
  );
  if (!todayEntries.length) return null;

  const dateLabel = ref.toLocaleDateString("nb-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const parts: DayPartSummary[] = [];

  for (const window of DAY_PART_WINDOWS) {
    const slice = entriesForDayPartWindow(
      timeseries,
      todayEntries,
      window,
      ref,
    );
    const summary = summarizePartEntries(slice, window.symbolAnchorHour, ref);
    if (summary) {
      parts.push({
        id: window.id,
        title: window.title,
        timeRangeLabel: formatDayPartTimeRange(window.hourMin, window.hourMax),
        ...summary,
      });
    }
  }

  if (!parts.length) return null;

  return { dateLabel, parts };
}
