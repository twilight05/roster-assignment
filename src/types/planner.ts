export type ShiftColor = "orange" | "green" | "yellow";

export type ViewMode = "live" | "planner";

export type RosterStatus = "available" | "on-leave";

export type RosterTab = "all" | "available" | "on-leave";

export type DayDotColor = "red" | "green" | "orange" | "blue" | "gray";

export interface WeekDayEntry {
  label: string;
  color: DayDotColor;
}

export interface RosterPerson {
  id: string;
  initials: string;
  name: string;
  contractHours: number;
  workedHours: number;
  dateRange: string;
  status: RosterStatus;
  weekDays: WeekDayEntry[];
}

export interface Department {
  id: string;
  name: string;
}

export interface Shift {
  id: string;
  departmentId: string;
  title: string;
  staffName: string;
  tag: string;
  start: string;
  end: string;
  color: ShiftColor;
}
