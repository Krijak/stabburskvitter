/**
 * All PNGs under src/img/weather_icons — bundled by Vite, keyed by Met.no symbol_code (filename without .png).
 */
const modules = import.meta.glob<{ default: string }>("../img/weather_icons/*.png", {
  eager: true,
});

function fileStemFromPath(path: string): string {
  const file = path.split("/").pop() ?? "";
  return file.replace(/\.png$/i, "");
}

export const weatherIconUrls: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [
    fileStemFromPath(path),
    mod.default,
  ]),
);

export function getWeatherIconUrl(symbolCode: string): string | undefined {
  return weatherIconUrls[symbolCode];
}
