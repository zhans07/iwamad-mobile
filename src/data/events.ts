export type CampusEvent = {
  id: number;
  title: string;
  date: string;
  place: string;
  seats: number;
};

export const events: CampusEvent[] = [
  {
    id: 1,
    title: "React Study Night",
    date: "2026-11-05",
    place: "Room 302",
    seats: 3,
  },
  {
    id: 2,
    title: "Campus Career Day",
    date: "2026-11-10",
    place: "Main Hall",
    seats: 30,
  },
  {
    id: 3,
    title: "UI/UX Design Meetup",
    date: "2026-11-14",
    place: "Design Studio",
    seats: 20,
  },
  {
    id: 4,
    title: "Student Hackathon",
    date: "2026-11-20",
    place: "Innovation Center",
    seats: 40,
  },
];