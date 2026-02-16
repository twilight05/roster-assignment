import type { CardData } from "@/components/planner/DepartmentColumn";

export const departments = [
  "Behandelingskamer1",
  "Management",
  "Bijzonderheden-Verlof-Cursus-...",
  "Financien",
];

export const scheduleData: Record<number, CardData[]> = {
  0: [
    {
      id: "1",
      title: "Surgery",
      startMin: 660,
      endMin: 780,
      staff: "Hakan de Gast",
      tag: "HG",
      tagColor: "var(--colors-sched-orange-tag)",
      bgColor: "var(--colors-sched-orange-bg)",
      borderColor: "var(--colors-sched-orange-border)",
      subColumn: "left",
    },
    {
      id: "2",
      title: "Pijnspecialist",
      startMin: 660,
      endMin: 810,
      staff: "Diana Larte",
      tag: "DL",
      tagColor: "var(--colors-sched-green-tag)",
      bgColor: "var(--colors-sched-green-bg)",
      borderColor: "var(--colors-sched-green-border)",
      subColumn: "right",
    },
  ],
  1: [
    {
      id: "3",
      title: "Pijnspecialist",
      startMin: 690,
      endMin: 810,
      staff: "Diana Larte",
      tag: "HG",
      tagColor: "var(--colors-sched-blue-tag)",
      bgColor: "var(--colors-sched-blue-bg)",
      borderColor: "var(--colors-sched-blue-border)",
    },
    {
      id: "6",
      title: "Pijnspecialist",
      startMin: 780,
      endMin: 900,
      staff: "Halco de Gast",
      tag: "HG",
      tagColor: "var(--colors-sched-purple-tag)",
      bgColor: "var(--colors-sched-purple-bg)",
      borderColor: "var(--colors-sched-purple-border)",
    },
  ],
  2: [
    {
      id: "4",
      title: "Pijnspecialist",
      startMin: 660,
      endMin: 720,
      staff: "",
      tag: "HG",
      tagColor: "var(--colors-sched-red-tag)",
      bgColor: "var(--colors-sched-red-bg)",
      borderColor: "var(--colors-sched-red-border)",
    },
  ],
  3: [
    {
      id: "5",
      title: "Pijnspecialist",
      startMin: 690,
      endMin: 810,
      staff: "Diana Larte",
      tag: "HG",
      tagColor: "var(--colors-sched-red-tag)",
      bgColor: "var(--colors-sched-red-bg)",
      borderColor: "var(--colors-sched-red-border)",
    },
  ],
};
