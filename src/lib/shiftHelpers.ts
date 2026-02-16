import type { ShiftColor, Shift } from "@/types/planner";
import type { CardData } from "@/components/planner/DepartmentColumn";
import { getMinutesFromIso } from "@/data/planner";

interface ColorTokens {
  tag: string;
  bg: string;
  border: string;
}

const colorMap: Record<ShiftColor, ColorTokens> = {
  orange: {
    tag: "schedOrangeTag",
    bg: "schedOrangeBg",
    border: "schedOrangeBorder",
  },
  green: {
    tag: "schedGreenTag",
    bg: "schedGreenBg",
    border: "schedGreenBorder",
  },
  blue: { tag: "schedBlueTag", bg: "schedBlueBg", border: "schedBlueBorder" },
  purple: {
    tag: "schedPurpleTag",
    bg: "schedPurpleBg",
    border: "schedPurpleBorder",
  },
  red: { tag: "schedRedTag", bg: "schedRedBg", border: "schedRedBorder" },
};

export function resolveColor(color: ShiftColor): ColorTokens {
  return colorMap[color];
}

export function shiftToCard(shift: Shift): CardData {
  const tokens = resolveColor(shift.color);

  return {
    id: shift.id,
    title: shift.title,
    startMin: getMinutesFromIso(shift.start),
    endMin: getMinutesFromIso(shift.end),
    staff: shift.staffName,
    tag: shift.tag,
    tagColor: tokens.tag,
    bgColor: tokens.bg,
    borderColor: tokens.border,
  };
}
