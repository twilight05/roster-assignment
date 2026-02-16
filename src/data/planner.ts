import type { Department, Shift, RosterPerson } from "@/types/planner";

export const departments: Department[] = [
  { id: "behandeling1", name: "Behandelingkamer1" },
  { id: "management", name: "Management" },
  { id: "verlof", name: "Bijzonderheden-Verlof-Cursus-.." },
  { id: "financien", name: "Financien" },
];

const buildIso = (date: string, time: string) => `${date}T${time}:00`;

export const shifts: Shift[] = [
  {
    id: "shift-1",
    departmentId: "behandeling1",
    title: "Surgery",
    staffName: "Haico de Gast",
    tag: "HG",
    start: buildIso("2025-09-08", "11:00"),
    end: buildIso("2025-09-08", "13:00"),
    color: "orange",
  },
  {
    id: "shift-2",
    departmentId: "behandeling1",
    title: "Pijnspecialist",
    staffName: "Diane Lane",
    tag: "DL",
    start: buildIso("2025-09-08", "11:00"),
    end: buildIso("2025-09-08", "12:00"),
    color: "green",
  },
  {
    id: "shift-3",
    departmentId: "management",
    title: "Pijnspecialist",
    staffName: "Haico de Gast",
    tag: "HG",
    start: buildIso("2025-09-08", "13:00"),
    end: buildIso("2025-09-08", "15:00"),
    color: "orange",
  },
  {
    id: "shift-4",
    departmentId: "verlof",
    title: "Pijnspecialist",
    staffName: "Diane Lane",
    tag: "HG",
    start: buildIso("2025-09-08", "11:30"),
    end: buildIso("2025-09-08", "13:30"),
    color: "yellow",
  },
  {
    id: "shift-5",
    departmentId: "verlof",
    title: "Pijnspecialist",
    staffName: "Diane Lane",
    tag: "HG",
    start: buildIso("2025-09-08", "16:00"),
    end: buildIso("2025-09-09", "00:00"),
    color: "green",
  },
  {
    id: "shift-6",
    departmentId: "financien",
    title: "Pijnspecialist",
    staffName: "Diane Lane",
    tag: "HG",
    start: buildIso("2025-09-08", "11:30"),
    end: buildIso("2025-09-08", "13:30"),
    color: "yellow",
  },
];

export const liveShifts: Shift[] = [
  {
    id: "live-1",
    departmentId: "behandeling1",
    title: "Surgery",
    staffName: "Hakan de Gast",
    tag: "HG",
    start: buildIso("2025-09-08", "11:00"),
    end: buildIso("2025-09-08", "12:30"),
    color: "orange",
  },
  {
    id: "live-2",
    departmentId: "behandeling1",
    title: "Consult",
    staffName: "Diana Larte",
    tag: "DL",
    start: buildIso("2025-09-08", "12:30"),
    end: buildIso("2025-09-08", "14:00"),
    color: "green",
  },
  {
    id: "live-3",
    departmentId: "management",
    title: "Standup",
    staffName: "Diana Larte",
    tag: "DL",
    start: buildIso("2025-09-08", "11:00"),
    end: buildIso("2025-09-08", "12:00"),
    color: "yellow",
  },
  {
    id: "live-4",
    departmentId: "financien",
    title: "Boekhouding",
    staffName: "Halco de Gast",
    tag: "HG",
    start: buildIso("2025-09-08", "13:00"),
    end: buildIso("2025-09-08", "15:00"),
    color: "orange",
  },
];

export function getMinutesFromIso(isoLocal: string): number {
  const timePart = isoLocal.slice(11, 16);
  const [h, m] = timePart.split(":").map(Number);
  return h * 60 + m || 24 * 60; // treat 00:00 as end-of-day (1440)
}

export function displayTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export function bound(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export const rosterPeople: RosterPerson[] = [
  {
    id: "person-1",
    initials: "EO",
    name: "Elijan Oyin",
    contractHours: 1158.0,
    workedHours: 38.0,
    dateRange: "Jan 8 - Jan 15",
    status: "on-leave",
    weekDays: [
      { label: "m", color: "green" },
      { label: "di", color: "red" },
      { label: "w", color: "orange" },
      { label: "do", color: "blue" },
      { label: "vr", color: "red" },
    ],
  },
  {
    id: "person-2",
    initials: "DL",
    name: "Diane Lane",
    contractHours: 1158.0,
    workedHours: 38.0,
    dateRange: "Jan 12 - Jan 28",
    status: "on-leave",
    weekDays: [
      { label: "m", color: "green" },
      { label: "di", color: "red" },
      { label: "w", color: "blue" },
      { label: "do", color: "orange" },
      { label: "vr", color: "green" },
    ],
  },
  {
    id: "person-3",
    initials: "EO",
    name: "Elijan Oyin",
    contractHours: 1158.0,
    workedHours: 38.0,
    dateRange: "Jan 12 - Jan 20",
    status: "on-leave",
    weekDays: [
      { label: "m", color: "red" },
      { label: "di", color: "red" },
      { label: "w", color: "green" },
      { label: "do", color: "red" },
      { label: "vr", color: "green" },
    ],
  },
  {
    id: "person-4",
    initials: "HG",
    name: "Haico De Gast",
    contractHours: 1158.0,
    workedHours: 38.0,
    dateRange: "Jan 2 - Jan 9",
    status: "on-leave",
    weekDays: [
      { label: "m", color: "green" },
      { label: "di", color: "green" },
      { label: "w", color: "orange" },
      { label: "do", color: "red" },
      { label: "vr", color: "green" },
    ],
  },
  {
    id: "person-5",
    initials: "ML",
    name: "Maria Linden",
    contractHours: 980.0,
    workedHours: 32.0,
    dateRange: "Feb 1 - Feb 14",
    status: "available",
    weekDays: [
      { label: "m", color: "green" },
      { label: "di", color: "green" },
      { label: "w", color: "green" },
      { label: "do", color: "blue" },
      { label: "vr", color: "green" },
    ],
  },
  {
    id: "person-6",
    initials: "JV",
    name: "Jan Vermeer",
    contractHours: 1240.0,
    workedHours: 40.0,
    dateRange: "Jan 5 - Jan 20",
    status: "available",
    weekDays: [
      { label: "m", color: "green" },
      { label: "di", color: "blue" },
      { label: "w", color: "green" },
      { label: "do", color: "green" },
      { label: "vr", color: "orange" },
    ],
  },
];
