import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export interface StatusData {
  fase: string;
  img: string;
  alt: string;
  description: string;
  startDate: Date;
  duration: number;
}

function formatDayMonth(date: Date): { day: number; month: string } {
  const day = date.getDate();
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAI",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OKT",
    "NOV",
    "DES",
  ];
  return { day, month: months[date.getMonth()] };
}

function getDateProgress(start: Date, end: Date, today: Date): number {
  const t = today.getTime();
  const s = start.getTime();
  const e = end.getTime();
  if (t <= s) return 0;
  if (t >= e) return 100;
  return Math.round(((t - s) / (e - s)) * 100);
}

import FaseProgress from "./FaseProgress";

const StatusPanel = ({ statusData }: { statusData: StatusData }) => {
  const today = new Date();
  const startDate = statusData.startDate;
  const endDate = new Date(
    startDate.getTime() + statusData.duration * 24 * 60 * 60 * 1000,
  );
  const dateProgressPercent = getDateProgress(startDate, endDate, today);
  const startLabel = formatDayMonth(startDate);
  const endLabel = formatDayMonth(endDate);

  return (
    <Stack alignItems="center" gap={4}>
      <Box maxWidth={"7rem"}>
        <img
          src={statusData.img}
          alt={statusData.alt}
          width={"100%"}
          style={{ mixBlendMode: "darken" }}
        />
      </Box>

      <Stack
        width={"100%"}
        flexDirection="row"
        gap={1}
        alignItems="center"
        textAlign="center"
      >
        <Typography variant="body2">
          {startLabel.day} {startLabel.month}
        </Typography>
        <Box width={"100%"}>
          <StyledLinearProgress
            variant="determinate"
            value={dateProgressPercent}
            thick
            role="progressbar"
            aria-valuenow={Math.round(dateProgressPercent)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Klekkeperiode fremdrift"
          />
        </Box>
        <Typography variant="body2">
          {endLabel.day} {endLabel.month}
        </Typography>
      </Stack>

      <Stack padding={2}>
        <Typography variant="body2">{statusData.description}</Typography>
      </Stack>
      <FaseProgress fasename={statusData.fase} />
    </Stack>
  );
};

export default StatusPanel;

const StyledLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "thick",
})<{ thick?: boolean }>(({ theme, thick }) => ({
  height: thick ? "0.3125rem" : "0.0625rem",
  borderRadius: "0.75rem",
  backgroundColor: theme.palette.primary.light,
  "& .MuiLinearProgress-bar": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "0.75rem",
  },
}));
