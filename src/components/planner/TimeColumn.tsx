"use client";

import { Box, Text } from "@chakra-ui/react";

interface TimeColumnProps {
  gridStartMin: number;
  totalSlots: number;
  slotMinutes?: number;
  slotHeight: number;
}

function formatTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${h}:${m.toString().padStart(2, "0")}`;
}

export default function TimeColumn({
  gridStartMin,
  totalSlots,
  slotMinutes = 30,
  slotHeight,
}: TimeColumnProps) {
  return (
    <Box w="80px" flexShrink={0} borderRight="1px solid #D9E5F2">
      {Array.from({ length: totalSlots }).map((_, i) => {
        const mins = gridStartMin + i * slotMinutes;
        const label = formatTime(mins);
        const isFullHour = mins % 60 === 0;

        return (
          <Box
            key={i}
            h={`${slotHeight}px`}
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-end"
            pr="12px"
            pt="4px"
            borderBottom={i < totalSlots - 1 ? "1px solid #F0F4F8" : "none"}
          >
            <Text
              fontSize="11px"
              fontWeight={isFullHour ? "600" : "500"}
              color={isFullHour ? "#3C4858" : "#8492A6"}
            >
              {label}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}
