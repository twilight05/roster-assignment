export type ShiftColor = "orange" | "green" | "blue" | "purple" | "red";

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
