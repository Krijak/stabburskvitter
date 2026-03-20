import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import birdhouseIcon from "../img/stabbur_icon.svg";
import StatusPanel from "./drawer/StatusPanel";
import OmBlaameisenPanel from "./drawer/OmBlaameisenPanel";
import OmStabburskvitterPanel from "./drawer/OmStabburskvitterPanel";
import { statusDataBlåmeis } from "../helpers/data";
import Fuglene from "./drawer/Fuglene";

export type DrawerId =
  | "status"
  | "om-blaameisen"
  | "om-stabburskvitter"
  | "fuglene";

interface NavItem {
  id: DrawerId;
  label: string;
}

const navItems: NavItem[] = [
  { id: "status", label: "STATUS" },
  // { id: "om-blaameisen", label: "BLÅMEISEN" },
  { id: "fuglene", label: "FUGLENE" },
  { id: "om-stabburskvitter", label: "OM" },
];

const Logo = () => (
  <Box sx={{ textAlign: "center", justifySelf: "center" }}>
    <Typography
      color="text.primary"
      component="h1"
      sx={{
        fontFamily: '"Kaisei Tokumin", serif',
        fontSize: "1.25rem",
        lineHeight: 1.2,
        marginBottom: 0,
      }}
    >
      Stabburskvitter
    </Typography>
    <Typography
      color="text.primary"
      component="span"
      sx={{
        fontFamily: '"Inter", sans-serif',
        fontSize: "0.75rem",
        lineHeight: 1.3,
        marginBottom: 0,
      }}
    >
      PP14 &amp; PP15
    </Typography>
    <Typography
      color="text.secondary"
      component={"span"}
      sx={{
        fontFamily: '"Inter", sans-serif',
        fontSize: "0.75rem",
        lineHeight: 1.3,
        marginBottom: 0,
        display: "block",
      }}
    >
      est. 2026
    </Typography>
  </Box>
);

export default function TopBar() {
  const [navListOpen, setNavListOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<DrawerId | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const openPanelDrawer = (id: DrawerId) => {
    setNavListOpen(false);
    setOpenDrawer(id);
  };

  const closePanelDrawer = () => setOpenDrawer(null);

  return (
    <AppBar position="sticky" component="header">
      <Toolbar
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          width: "100%",
          padding: 1,
        }}
      >
        <Stack justifyContent="center" sx={{ justifySelf: "start" }}>
          <img
            src={birdhouseIcon}
            alt="Stabbur-ikon"
            loading="eager"
            decoding="sync"
          />
        </Stack>

        <Box sx={{ justifySelf: "center" }}>
          <Logo />
        </Box>

        <Box sx={{ justifySelf: "end" }}>
          {isMobile ? (
            <>
              <IconButton
                aria-label="Åpne navigasjonsmeny"
                onClick={() => {
                  setNavListOpen(!navListOpen);
                  closePanelDrawer();
                }}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top"
                open={navListOpen}
                onClose={() => setNavListOpen(false)}
                slotProps={{
                  root: { sx: { zIndex: theme.zIndex.appBar - 1 } },
                  backdrop: { sx: { backgroundColor: "transparent" } },
                  paper: {
                    sx: {
                      backgroundColor: theme.palette.background.paper,
                      pt: "5rem",
                    },
                  },
                }}
              >
                <Stack
                  component={"nav"}
                  justifyContent="space-between"
                  alignItems="center"
                  height="100%"
                >
                  <List
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {navItems.map((item) => (
                      <ListItem key={item.id} sx={{ width: "unset" }}>
                        <Box>
                          <Button
                            variant="primary"
                            onClick={() => openPanelDrawer(item.id)}
                            sx={{
                              fontWeight: openDrawer === item.id ? 700 : 400,
                            }}
                          >
                            {item.label}
                          </Button>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              </Drawer>
            </>
          ) : (
            <Stack component={"nav"} flexDirection="row">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="primary"
                  sx={{
                    textShadow: openDrawer === item.id ? "0.4px 0 0 black" : "",
                  }}
                  onClick={() =>
                    openDrawer === item.id
                      ? closePanelDrawer()
                      : openPanelDrawer(item.id)
                  }
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          )}
          <Drawer
            anchor="top"
            open={openDrawer !== null}
            onClose={closePanelDrawer}
            transitionDuration={{ enter: 300, exit: 300 }}
            slotProps={{
              root: { sx: { zIndex: theme.zIndex.appBar - 1 } },
              backdrop: { sx: { backgroundColor: "transparent" } },
              paper: {
                sx: {
                  left: "unset",
                  right: "2rem",
                  width: "15rem",
                  backgroundColor: theme.palette.background.paper,
                  pt: "5rem",
                  pb: "2rem",
                },
              },
            }}
          >
            <Stack padding={4}>
              {openDrawer === "status" && (
                <StatusPanel statusData={statusDataBlåmeis[0]} />
              )}
              {openDrawer === "om-blaameisen" && <OmBlaameisenPanel />}
              {openDrawer === "om-stabburskvitter" && (
                <OmStabburskvitterPanel />
              )}
              {openDrawer === "fuglene" && <Fuglene />}
            </Stack>
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
