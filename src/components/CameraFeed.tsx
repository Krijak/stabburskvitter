import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import blue_tit_flying from "../img/blue_tit_flying.gif"

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
  const myIP = "192.168.2.6";
  const API_URL = `http://${myIP}:9997/v3/paths/list`;
  const PLAYER_URL = `http://${myIP}:8889/${streamName}`;
  const [streamStatus, setStreamStatus] = useState<StreamStatus>("offline");

  const checkStatus = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // Check if the path exists and is currently "ready" (active source)
      const stream = data.items?.find((item: any) => item.name === streamName);

      if (stream && stream.ready) {
        console.log("Stream is live!");
        setStreamStatus("online");
      } else {
        if (response.status === 401) {
          console.log("Authentication failed. Check apiUser/apiPass in mediamtx.yml");
          setStreamStatus("online");
        }
        else if (response.status === 404) {
          setStreamStatus("offline");
        }
        else {
          console.log("Stream is not live!", response.status);
          setStreamStatus("offline");
        }
      }
    } catch (error) {
      console.log("Error checking stream status:", error);
      setStreamStatus("offline");
      console.log(streamStatus);
    }
  };

  useEffect(() => {
    // Initial check
    checkStatus();

    const interval = setInterval(checkStatus, 50000);
    return () => clearInterval(interval);
  }, [streamName]);


  return (
    <FeedContainer role="img" aria-label="Direktevideo fra fuglekassen">
      {/* <YouTubeFrame
        src="https://www.youtube.com/embed/ogH1z3eTi2Q?autoplay=1&mute=1&playsinline=1&rel=0"
        title="YouTube live stream"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="eager"
      /> */}
      {streamStatus === "online" ? (
        <PlayerFrame src={PLAYER_URL} />
      ) : (
        <Stack alignItems={"center"}>
          <Stack
            width="6rem"
            justifyContent="center"
            alignItems="center"
            pb={theme => theme.spacing(2)}
          >
            <Halo />
            <img
              src={blue_tit_flying}
              style={{ mixBlendMode: "darken" }}
              width="100%"
            />
          </Stack>
          <Stack gap={theme => theme.spacing(2)} bgcolor={"white"} maxWidth={"20rem"} width={"100%"} alignItems={"center"} justifyContent={"center"} borderRadius={"5px"} p={theme => theme.spacing(5)}>

            <Stack gap={1}>
              <Typography variant="subtitle1" fontWeight={"bold"} textAlign={"center"}>Oida!</Typography>
              <Typography>Her fikk vi ikke kontakt med stabburet vårt! Prøv igjen litt senere</Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
    </FeedContainer>
  );
}


const Halo = styled(Box)({
  position: "absolute",
  width: "0px",
  height: "0px",
  borderRadius: "50%",
  boxShadow: "0 0 50px 30px #fffffff2",
});