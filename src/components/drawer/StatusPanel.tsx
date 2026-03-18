import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const imgNest =
  'http://localhost:3845/assets/0ad23caf6cd44f2065bc778050efbf45e99fdb6b.png';

const Panel = styled('aside')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: '12.375rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1.25rem 0 1rem',
  flexShrink: 0,
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const NestImageWrapper = styled(Box)({
  width: '8.75rem',
  height: '8.125rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '0.5rem',
});

const NestImage = styled('img')({
  width: '7rem',
  height: '5.75rem',
  objectFit: 'contain',
  mixBlendMode: 'darken',
  transform: 'rotate(24.68deg)',
});

const StyledLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== 'thick',
})<{ thick?: boolean }>(({ theme, thick }) => ({
  height: thick ? '0.3125rem' : '0.0625rem',
  borderRadius: '0.75rem',
  backgroundColor: theme.palette.primary.light,
  '& .MuiLinearProgress-bar': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '0.75rem',
  },
}));

const DateLabel = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: '0.375rem',
  lineHeight: 1.2,
  textAlign: 'center',
  color: theme.palette.text.primary,
  marginBottom: 0,
}));

const CaLabel = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: '0.25rem',
  color: theme.palette.text.primary,
  lineHeight: 1,
  textAlign: 'center',
  marginBottom: 0,
}));

const EggDescription = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: '0.5rem',
  textAlign: 'center',
  width: '5.75rem',
  lineHeight: 1.5,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
}));

const PhaseLabel = styled(Typography)<{ active?: boolean }>(({ theme, active }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: '0.375rem',
  fontWeight: active ? 700 : 400,
  color: theme.palette.text.primary,
  textAlign: 'center',
  whiteSpace: 'nowrap',
  marginBottom: 0,
}));

const TickMark = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
  position: 'absolute',
  top: '-0.1875rem',
  width: '0.0625rem',
  height: '0.4375rem',
  backgroundColor: active ? theme.palette.primary.main : theme.palette.primary.light,
  borderRadius: '0.75rem',
  transform: 'translateX(-50%)',
}));

function formatDayMonth(date: Date): { day: number; month: string } {
  const day = date.getDate();
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DES'];
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

const StatusPanel = () => {
  const today = new Date();
  const year = today.getFullYear();
  const startDate = new Date(year, 2, 1);
  const endDate = new Date(year, 2, 31);
  const dateProgressPercent = getDateProgress(startDate, endDate, today);
  const startLabel = formatDayMonth(startDate);
  const endLabel = formatDayMonth(endDate);

  const phaseProgressPercent = (49 / 106) * 100;

  return (
    <Panel aria-label="Rugingstatus">
      <NestImageWrapper>
        <NestImage src={imgNest} alt="Blåmeis i reiret med egg" />
      </NestImageWrapper>

      <Box sx={{ width: '5.5rem', mb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <DateLabel>
            {startLabel.day}.<br />{startLabel.month}
          </DateLabel>
          <Box sx={{ textAlign: 'center' }}>
            <CaLabel>ca</CaLabel>
            <DateLabel>
              {endLabel.day}.<br />{endLabel.month}
            </DateLabel>
          </Box>
        </Box>

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

      <EggDescription>
        Blåmeisegg klekkes i løpet av 12–14 dager
      </EggDescription>

      <Box sx={{ width: '6.625rem', position: 'relative', mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
          <PhaseLabel>REDEBYGGING</PhaseLabel>
          <PhaseLabel active>RUGING</PhaseLabel>
          <PhaseLabel>OPPFOSTRING</PhaseLabel>
        </Box>

        <Box sx={{ position: 'relative' }}>
          <StyledLinearProgress
            variant="determinate"
            value={phaseProgressPercent}
            role="progressbar"
            aria-valuenow={Math.round(phaseProgressPercent)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Rugingfase fremdrift"
          />
          <TickMark active sx={{ left: '0%' }} />
          <TickMark active sx={{ left: '46%' }} />
          <TickMark sx={{ left: '100%' }} />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
          <PhaseLabel active>RUGING</PhaseLabel>
        </Box>
      </Box>
    </Panel>
  );
}

export default StatusPanel;