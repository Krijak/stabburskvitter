import nest_egg from "../img/nest_egg.png";
import nest_empty from "../img/nest_empty.png";
import nest_young from "../img/nest_young.png";
import bird_flight from "../img/bird_flight.png";
import type { StatusData } from "../components/drawer/StatusPanel";

export const statusDataBlåmeis: StatusData[] = [
  {
    fase: "Ingen fugler enda",
    img: nest_empty,
    alt: "Tomt fuglehus",
    description: "Småfuglene leter etter et sted å bo fra mars til ut i april",
    startDate: new Date(2026, 2, 1),
    duration: 45,
  },
  {
    fase: "Redebygging",
    img: nest_empty,
    alt: "Tomt reir",
    description: "Blåmeisegg bruker 7-14 dager på å bygge reiret sitt",
    startDate: new Date(2026, 2, 18),
    duration: 7,
  },
  {
    fase: "Ruging",
    alt: "Reir med egg",
    img: nest_egg,
    description: "Blåmeisegg klekkes i løpet av 12–14 dager",
    startDate: new Date(2026, 2, 1),
    duration: 12,
  },
  {
    fase: "Oppfostring",
    alt: "Reir med fugleunger",
    img: nest_young,
    description: "Blåmeisungene flytter ut i løpet av 16-22 dager",
    startDate: new Date(2026, 2, 1),
    duration: 16,
  },
  {
    fase: "Ut av redet",
    alt: "Flygende fugl",
    img: bird_flight,
    description:
      "Blåmeisungene har forlatt redet, men det er ikke så uvanlig at blåmeisene får et kull nummer to! Hvem vet?",
    startDate: new Date(2026, 2, 1),
    duration: 16,
  },
];
