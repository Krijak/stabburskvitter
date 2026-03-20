import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const FeedContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "670 / 327",
  maxWidth: "60rem",
  padding: theme.spacing(3),
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    aspectRatio: "16/9",
  },
}));

const YouTubeFrame = styled("iframe")({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  display: "block",
  border: 0,
});

export default function CameraFeed() {
  return (
    <FeedContainer role="img" aria-label="Direktevideo fra fuglekassen">
      <YouTubeFrame
        src="https://www.youtube.com/embed/ogH1z3eTi2Q?autoplay=0&mute=1&playsinline=1&rel=0"
        title="YouTube live stream"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </FeedContainer>
  );
}
