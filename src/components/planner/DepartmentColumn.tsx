"use client";

import { Box, Text } from "@chakra-ui/react";
import ScheduleCard from "./ScheduleCard";

export interface CardData {
  id: string;
  title: string;
  startMin: number;
  endMin: number;
  staff: string;
  tag: string;
  tagColor: string;
  bgColor: string;
  borderColor: string;
  subColumn?: "left" | "right";
}

export interface SeeAllIndicator {
  slotIndex: number;
  subColumn?: "left" | "right";
}

interface DepartmentColumnProps {
  totalSlots: number;
  slotHeight: number;
  slotMinutes?: number;
  gridStartMin: number;
  gridEndMin: number;
  cards: CardData[];
  seeAll?: SeeAllIndicator;
  showBorderRight?: boolean;
}

export default function DepartmentColumn({
  totalSlots,
  slotHeight,
  slotMinutes = 30,
  gridStartMin,
  gridEndMin,
  cards,
  seeAll,
  showBorderRight = true,
}: DepartmentColumnProps) {
  const pxPerMinute = slotHeight / slotMinutes;
  const totalHeight = totalSlots * slotHeight;

  const seeAllLeft = seeAll?.subColumn === "right" ? "calc(50% + 4px)" : "8px";
  const seeAllRight = seeAll?.subColumn === "left" ? "calc(50% + 4px)" : "8px";

  return (
    <Box
      position="relative"
      h={`${totalHeight}px`}
      borderRight={showBorderRight ? "1px solid" : "none"}
      borderColor="borderDefault"
      overflow="hidden"
    >
      {Array.from({ length: totalSlots }).map((_, i) => (
        <Box
          key={i}
          position="absolute"
          top={`${i * slotHeight}px`}
          left="0"
          right="0"
          h={`${slotHeight}px`}
          borderBottom={i < totalSlots - 1 ? "1px solid" : "none"}
          borderColor="borderSoft"
          pointerEvents="none"
        />
      ))}

      {cards
        .filter((c) => c.startMin < gridEndMin && c.endMin > gridStartMin)
        .map((card) => {
          const clampedStart = Math.max(card.startMin, gridStartMin);
          const clampedEnd = Math.min(card.endMin, gridEndMin);

          const top = (clampedStart - gridStartMin) * pxPerMinute;
          const rawHeight = (clampedEnd - clampedStart) * pxPerMinute;
          const cardHeight = Math.max(rawHeight - 4, 28);

          let left = "8px";
          let right = "8px";

          if (card.subColumn === "left") {
            right = "calc(50% + 4px)";
          } else if (card.subColumn === "right") {
            left = "calc(50% + 4px)";
          }

          return (
            <ScheduleCard
              key={card.id}
              title={card.title}
              timeLabel={`${formatTime(card.startMin)} - ${formatTime(
                card.endMin,
              )}`}
              staff={card.staff}
              tag={card.tag}
              tagColor={card.tagColor}
              bgColor={card.bgColor}
              borderColor={card.borderColor}
              style={{
                position: "absolute",
                top: `${top}px`,
                left,
                right,
                height: `${cardHeight}px`,
                zIndex: 2,
              }}
            />
          );
        })}

      {seeAll && seeAll.slotIndex >= 0 && seeAll.slotIndex < totalSlots && (
        <Box
          position="absolute"
          top={`${seeAll.slotIndex * slotHeight + (slotHeight - 64) / 2}px`}
          left={seeAllLeft}
          right={seeAllRight}
          maxW="110px"
          mx="auto"
          h="64px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="surfaceSoft"
          border="1px solid"
          borderColor="borderDefault"
          borderRadius="sm"
          cursor="pointer"
          zIndex={1}
          _hover={{ bg: "surfaceSoftHover" }}
        >
          <Text fontSize="xs" fontWeight="600" color="textSecondary">
            See all
          </Text>
        </Box>
      )}
    </Box>
  );
}

function formatTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${h}:${m.toString().padStart(2, "0")}`;
}
