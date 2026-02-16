import type { Department, Shift } from "@/types/planner";

export const departments: Department[] = [
  { id: "behandeling1", name: "Behandelingskamer1" },
  { id: "management", name: "Management" },
  { id: "verlof", name: "Bijzonderheden-Verlof-Cursus-..." },
  { id: "financien", name: "Financien" },
];

const buildIso = (date: string, time: string) => `${date}T${time}:00`;

export const shifts: Shift[] = [
  {
    id: "shift-1",
    departmentId: "behandeling1",
    title: "Surgery",
    staffName: "Hakan de Gast",
    tag: "HG",
    start: buildIso("2025-09-08", "11:00"),
    end: buildIso("2025-09-08", "13:00"),
    color: "orange",
  },
  {
    id: "shift-2",
    departmentId: "behandeling1",
    title: "Pijnspecialist",
    staffName: "Diana Larte",
    tag: "DL",
    start: buildIso("2025-09-08", "11:00"),
    end: buildIso("2025-09-08", "13:30"),
    color: "green",
  },
  {
    id: "shift-3",
    departmentId: "management",
    title: "Pijnspecialist",
    staffName: "Diana Larte",
    tag: "HG",
    start: buildIso("2025-09-08", "11:30"),
    end: buildIso("2025-09-08", "13:30"),
    color: "blue",
  },
  {
    id: "shift-4",
    departmentId: "management",
    title: "Pijnspecialist",
    staffName: "Halco de Gast",
    tag: "HG",
    start: buildIso("2025-09-08", "13:00"),
    end: buildIso("2025-09-08", "15:00"),
    color: "purple",
  },
  {
    id: "shift-5",
    departmentId: "verlof",
    title: "Pijnspecialist",
    staffName: "",
    tag: "HG",
    start: buildIso("2025-09-08", "11:00"),
    end: buildIso("2025-09-08", "12:00"),
    color: "red",
  },
  {
    id: "shift-6",
    departmentId: "financien",
    title: "Pijnspecialist",
    staffName: "Diana Larte",
    tag: "HG",
    start: buildIso("2025-09-08", "11:30"),
    end: buildIso("2025-09-08", "13:30"),
    color: "red",
  },
];

export function getMinutesFromIso(isoLocal: string): number {
  const d = new Date(isoLocal);
  return d.getHours() * 60 + d.getMinutes();
}

/** Format a minutes-since-midnight value as "H:MM" */
export function displayTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${h}:${m.toString().padStart(2, "0")}`;
}

export function bound(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}
