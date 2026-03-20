import { useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { cameraStreamUrl } from "../helpers/camera";

const FeedContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: "41.875rem",
  aspectRatio: "670 / 327",
  padding: theme.spacing(2),
  boxShadow: theme.palette.custom.videoBoxShadow,
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    aspectRatio: "16/9",
  },
}));

const StreamImage = styled("img")({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

export default function CameraFeed() {
  const streamUrl = cameraStreamUrl;
  const [isConnected, setIsConnected] = useState(false);

  console.log(streamUrl);

  if (!streamUrl) return null;

  if (!isConnected) {
    return (
      <Box
        sx={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <img
          src={streamUrl}
          alt=""
          crossOrigin="anonymous"
          onLoad={() => setIsConnected(true)}
        />
      </Box>
    );
  }

  return (
    <FeedContainer role="img" aria-label="Direktevideo fra fuglekassen">
      <StreamImage
        src={streamUrl}
        alt="Direktevideo fra kamera i fuglekassen – PP14 og PP15"
        crossOrigin="anonymous"
      />
    </FeedContainer>
  );
}
