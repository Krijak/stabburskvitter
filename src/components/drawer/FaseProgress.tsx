import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const FASE_NAMES = ["Redebygging", "Ruging", "Oppfostring"] as const;
const NONE_PHASE = "Ingen fugler enda";
const ALL_FILLED_PHASE = "Ut av redet";

const normalize = (s: string) => s.toUpperCase();

const LINE_CONFIG = [
  { flex: 1, hasTick: true },
  { flex: 2, hasTick: true },
  { flex: 2, hasTick: true },
  { flex: 1, hasTick: false },
] as const;

export interface FaseProgressProps {
  fasename: string;
}

export default function FaseProgress({ fasename }: FaseProgressProps) {
  const theme = useTheme();
  const norm = normalize(fasename);
  const isNone = norm === normalize(NONE_PHASE);
  const isAllFilled = norm === normalize(ALL_FILLED_PHASE);
  const activeIndex =
    isNone || !FASE_NAMES.some((p) => normalize(p) === norm)
      ? -1
      : FASE_NAMES.findIndex((p) => normalize(p) === norm);

  const dark = theme.palette.primary.main;
  const light = theme.palette.primary.light;
  const filled = (i: number) =>
    isAllFilled || (activeIndex >= 0 && i <= activeIndex);
  const bold = (i: number) =>
    !isNone && !isAllFilled && i === activeIndex;

  return (
    <Stack width="100%" gap={0.5}>
      <LabelsRow position="top" bold={bold} />
      <PhaseLine
        filled={filled}
        isAllFilled={isAllFilled}
        dark={dark}
        light={light}
      />
      <LabelsRow position="bottom" bold={bold} />
    </Stack>
  );
}

function FaseLabel({
  name,
  bold,
}: {
  name: string;
  bold: boolean;
}) {
  return (
    <Typography
      variant="body2"
      sx={{
        textTransform: "uppercase",
        fontSize: "0.7rem",
        fontWeight: bold ? 700 : 400,
      }}
    >
      {normalize(name)}
    </Typography>
  );
}

function LabelsRow({
  position,
  bold,
}: {
  position: "top" | "bottom";
  bold: (i: number) => boolean;
}) {
  const show = (i: number) => (position === "top" ? i % 2 === 0 : i % 2 === 1);
  return (
    <Box display="flex" width="100%">
      {FASE_NAMES.map((name, i) => (
        <Box key={name} flex={1} display="flex" justifyContent="center">
          {show(i) ? <FaseLabel name={name} bold={bold(i)} /> : null}
        </Box>
      ))}
    </Box>
  );
}

function Segment({
  filled,
  dark,
  light,
}: {
  filled: boolean;
  dark: string;
  light: string;
}) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        height: "0.0625rem",
        backgroundColor: filled ? dark : light,
      }}
    />
  );
}

function Tick({ filled, dark, light }: { filled: boolean; dark: string; light: string }) {
  return (
    <Box
      sx={{
        width: "0.125rem",
        height: "0.5rem",
        flexShrink: 0,
        backgroundColor: filled ? dark : light,
      }}
    />
  );
}

function PhaseLine({
  filled,
  isAllFilled,
  dark,
  light,
}: {
  filled: (i: number) => boolean;
  isAllFilled: boolean;
  dark: string;
  light: string;
}) {
  return (
    <Box display="flex" alignItems="center" width="100%">
      {LINE_CONFIG.map(({ flex, hasTick }, i) => (
        <Box key={i} display="flex" flex={flex} minWidth={0} alignItems="center">
          <Segment
            filled={i < 3 ? filled(i) : isAllFilled}
            dark={dark}
            light={light}
          />
          {hasTick && <Tick filled={filled(i)} dark={dark} light={light} />}
        </Box>
      ))}
    </Box>
  );
}
