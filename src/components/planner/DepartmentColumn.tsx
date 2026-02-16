"use client";

import { Box, Text } from "@chakra-ui/react";
import ScheduleCard from "./ScheduleCard";
import { displayTime } from "@/data/planner";

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
  staffColor: string;
}

export interface SeeAllIndicator {
  slotIndex: number;
  laneIndex?: number;
  laneCount?: number;
}

interface LanedCard extends CardData {
  laneIndex: number;
  laneCount: number;
}

/** Assign each card a lane index based on time overlaps */
function assignLanes(cards: CardData[]): LanedCard[] {
  const sorted = [...cards].sort((a, b) => a.startMin - b.startMin);

  // Greedy lane assignment — place into first available lane
  const laneEnds: number[] = [];
  const placed = sorted.map((card) => {
    let lane = laneEnds.findIndex((end) => card.startMin >= end);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(card.endMin);
    } else {
      laneEnds[lane] = card.endMin;
    }
    return { card, lane };
  });

  // Sweep-based overlap grouping (handles transitive overlaps: A↔B↔C)
  const withIdx = placed.map((p, idx) => ({ ...p, idx }));
  withIdx.sort((a, b) => a.card.startMin - b.card.startMin);

  const groups: number[][] = [];
  let active: number[] = [];
  let groupEnd = -Infinity;

  for (const item of withIdx) {
    if (active.length > 0 && item.card.startMin >= groupEnd) {
      groups.push(active);
      active = [];
      groupEnd = -Infinity;
    }
    active.push(item.idx);
    groupEnd = Math.max(groupEnd, item.card.endMin);
  }
  if (active.length) groups.push(active);

  // laneCount per group = distinct lanes used across the whole overlap group
  const laneCountByIdx = new Map<number, number>();
  for (const group of groups) {
    const distinctLanes = new Set(group.map((i) => placed[i].lane));
    const count = distinctLanes.size || 1;
    for (const i of group) laneCountByIdx.set(i, count);
  }

  return placed.map((p, idx) => ({
    ...p.card,
    laneIndex: p.lane,
    laneCount: laneCountByIdx.get(idx) ?? 1,
  }));
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
  onCardClick?: (cardId: string) => void;
  onSeeAllClick?: (slotIndex: number) => void;
}

const CARD_GAP = 6;
const CARD_PAD = 8;

export default function DepartmentColumn({
  totalSlots,
  slotHeight,
  slotMinutes = 30,
  gridStartMin,
  gridEndMin,
  cards,
  seeAll,
  showBorderRight = true,
  onCardClick,
  onSeeAllClick,
}: DepartmentColumnProps) {
  const pxPerMinute = slotHeight / slotMinutes;
  const totalHeight = totalSlots * slotHeight;

  const visible = cards.filter(
    (c) => c.startMin < gridEndMin && c.endMin > gridStartMin,
  );
  const laned = assignLanes(visible);

  const showSeeAll =
    seeAll && seeAll.slotIndex >= 0 && seeAll.slotIndex < totalSlots;
  const seeAllLaneIdx = seeAll?.laneIndex ?? 0;
  const seeAllLanes = seeAll?.laneCount ?? 1;

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

      {laned.map((card) => {
        const clampedStart = Math.max(card.startMin, gridStartMin);
        const clampedEnd = Math.min(card.endMin, gridEndMin);

        const top = (clampedStart - gridStartMin) * pxPerMinute;
        const rawHeight = (clampedEnd - clampedStart) * pxPerMinute;
        const cardHeight = Math.max(rawHeight - 4, 28);

        const left = `calc(${CARD_PAD}px + ${card.laneIndex} * (100% - ${2 * CARD_PAD}px) / ${card.laneCount})`;
        const width =
          card.laneCount === 1
            ? `calc(100% - ${2 * CARD_PAD}px)`
            : `calc((100% - ${2 * CARD_PAD}px) / ${card.laneCount} - ${CARD_GAP}px)`;

        return (
          <ScheduleCard
            key={card.id}
            title={card.title}
            timeLabel={`${displayTime(card.startMin)} - ${displayTime(
              card.endMin,
            )}`}
            staff={card.staff}
            tag={card.tag}
            tagColor={card.tagColor}
            bgColor={card.bgColor}
            borderColor={card.borderColor}
            staffColor={card.staffColor}
            onClick={onCardClick ? () => onCardClick(card.id) : undefined}
            style={{
              position: "absolute",
              top: `${top}px`,
              left,
              width,
              height: `${cardHeight}px`,
              zIndex: 2,
            }}
          />
        );
      })}

      {showSeeAll && (
        <Box
          position="absolute"
          maxW="110px"
          h="64px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="surfaceSoft"
          border="1px solid"
          borderColor="borderDefault"
          borderRadius="sm"
          cursor="pointer"
          zIndex={2}
          _hover={{ bg: "surfaceSoftHover" }}
          onClick={
            onSeeAllClick ? () => onSeeAllClick(seeAll!.slotIndex) : undefined
          }
          style={{
            top: `${seeAll!.slotIndex * slotHeight + (slotHeight - 64) / 2}px`,
            left: `calc(${CARD_PAD}px + ${seeAllLaneIdx} * (100% - ${2 * CARD_PAD}px) / ${seeAllLanes})`,
            width: `calc((100% - ${2 * CARD_PAD}px) / ${seeAllLanes} - ${CARD_GAP}px)`,
          }}
        >
          <Text fontSize="xs" fontWeight="600" color="textSecondary">
            See all
          </Text>
        </Box>
      )}
    </Box>
  );
}
