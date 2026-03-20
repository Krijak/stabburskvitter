import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TopBar from "./components/TopBar";
import CameraFeed from "./components/CameraFeed";
import { Stack } from "@mui/material";
import background from "./img/background.png";
import blue_tit_flying from "./img/blue_tit_flying.gif";

export default function App() {
  return (
    <Stack
      direction="column"
      sx={{ minHeight: "100vh", height: "100%" }}
      bgcolor={"#eef6ee"}
    >
      <TopBar />
      <MainContent>
        <BackgroundImage
          src={background}
          alt=""
          aria-hidden="true"
          loading="eager"
        />
        <ContentArea>
          <Stack
            sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            alignItems="center"
            justifyContent="center"
            zIndex={0}
          >
            <Stack
              width="6rem"
              justifyContent="center"
              alignItems="center"
              paddingBottom={"150px"}
            >
              <Halo />
              <img
                src={blue_tit_flying}
                style={{ mixBlendMode: "darken" }}
                width="100%"
              />
            </Stack>
          </Stack>
          <CameraFeedWrapper>
            <CameraFeed />
          </CameraFeedWrapper>
        </ContentArea>
      </MainContent>
    </Stack>
  );
}

const Halo = styled(Box)({
  position: "absolute",
  width: "0px",
  height: "0px",
  borderRadius: "50%",
  boxShadow: "0 0 50px 30px #fffffff2",
});

const MainContent = styled("main")({
  position: "relative",
  flex: 1,
  minHeight: "calc(100vh - 6.6875rem)",
  overflow: "hidden",
});

const BackgroundImage = styled("img")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  pointerEvents: "none",
  userSelect: "none",
});

const ContentArea = styled(Box)({
  position: "relative",
  zIndex: 1,
  display: "flex",
  height: "100%",
  minHeight: "calc(100vh - 6.6875rem)",
  alignItems: "center",
});

const CameraFeedWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
}));
