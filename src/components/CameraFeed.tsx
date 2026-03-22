import { Drawer } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import CameraFeedDrawerContent from "./CameraFeedDrawerContent";
import {
  fetchYrCompactForecast,
  summarizeDayPartsForecast,
  type DayPartsForecast,
} from "../helpers/yrWeather";
import { theme } from "../theme";


const WEATHER_LAT = 59.92;
const WEATHER_LON = 10.73;

const FeedContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "6/3.37",
  maxWidth: "60rem",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

const PlayerFrame = styled("iframe")({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  display: "block",
  border: 0,
});

type StreamStatus = "online" | "offline";

export default function CameraFeed() {
  const streamName = "stabburskvitter";
  const API_URL = `https://api.stabburskvitter.no/v3/paths/list`;
  const PLAYER_URL = `https://camera.stabburskvitter.no/${streamName}/`;
  const [streamStatus, setStreamStatus] = useState<StreamStatus>("offline");
  const [showDrawerContent, setShowDrawerContent] = useState(false);
  const [dayPartsWeather, setDayPartsWeather] = useState<DayPartsForecast | null>(
    null,
  );
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const checkStatus = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // Check if the path exists and is currently "ready" (active source)
      const stream = data.items?.find((item: any) => item.name === streamName);

      if (stream && stream.ready) {
        console.log("Stream is live!", stream);
        console.log(stream);
        setStreamStatus("online");
      } else {
        if (response.status === 401) {
          console.log(
            "Authentication failed. Check apiUser/apiPass in mediamtx.yml",
          );
          setStreamStatus("online");
        }
      }
    } catch (error) {
      console.log("Error checking stream status:", error);
      setStreamStatus("offline");
    }
  };

  useEffect(() => {
    // Initial check
    checkStatus();

    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, [streamName]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setShowDrawerContent(true);
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setWeatherLoading(true);
      setWeatherError(null);
      try {
        const data = await fetchYrCompactForecast(WEATHER_LAT, WEATHER_LON);
        const summary = summarizeDayPartsForecast(
          data.properties?.timeseries,
          new Date(),
        );
        if (!cancelled) {
          setDayPartsWeather(summary);
        }
      } catch (e) {
        if (!cancelled) {
          setWeatherError(
            e instanceof Error ? e.message : "Kunne ikke hente værvarsel.",
          );
          setDayPartsWeather(null);
        }
      } finally {
        if (!cancelled) setWeatherLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <FeedContainer role="img" aria-label="Direktevideo fra fuglekassen">
      {/* <YouTubeFrame
        src="https://www.youtube.com/embed/ogH1z3eTi2Q?autoplay=1&mute=1&playsinline=1&rel=0"
        title="YouTube live stream"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="eager"
      /> */}
      {streamStatus === "online" && <PlayerFrame src={PLAYER_URL} />}
      <Drawer
        anchor="top"
        open={true}
        // open={streamStatus === "offline"}
        hideBackdrop
        transitionDuration={{ enter: 300, exit: 300 }}
        slotProps={{
          root: { sx: { zIndex: theme.zIndex.appBar - 1 } },
          backdrop: { sx: { backgroundColor: "transparent" } },
          paper: {
            sx: {
              left: "calc(50% - 7.5rem)",
              width: "15rem",
              backgroundColor: theme.palette.background.paper,
              pt: "5rem",
              pb: "2rem",
            },
          },
        }}
      >
        <CameraFeedDrawerContent
          showDelayedContent={showDrawerContent}
          dayPartsWeather={dayPartsWeather}
          weatherLoading={weatherLoading}
        />
      </Drawer>
    </FeedContainer>
  );
}

// const Halo = styled(Box)({
//   position: "absolute",
//   width: "0px",
//   height: "0px",
//   borderRadius: "50%",
//   boxShadow: "0 0 50px 30px #fffffff2",
// });
