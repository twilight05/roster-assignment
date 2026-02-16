"use client";

import { useEffect, useRef } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CloseCircle } from "iconsax-reactjs";
import type { Shift } from "@/types/planner";
import { getMinutesFromIso, displayTime } from "@/data/planner";
import { resolveColor } from "@/lib/shiftHelpers";

interface TimeGroup {
  label: string;
  startMin: number;
  shifts: Shift[];
}

interface ShiftListPanelProps {
  open: boolean;
  onClose: () => void;
  dayLabel: string;
  shifts: Shift[];
  scrollToMin?: number;
}

function groupByStartTime(items: Shift[]): TimeGroup[] {
  const map = new Map<string, Shift[]>();

  for (const s of items) {
    const key = s.start.slice(11, 16); // "HH:MM"
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(s);
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([timeKey, group]) => ({
      label: timeKey,
      startMin: getMinutesFromIso(group[0].start),
      shifts: group,
    }));
}

export default function ShiftListPanel({
  open,
  onClose,
  dayLabel,
  shifts,
  scrollToMin,
}: ShiftListPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || scrollToMin == null || !scrollRef.current) return;

    const target = scrollRef.current.querySelector(
      `[data-start-min="${scrollToMin}"]`,
    );
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      const groups = scrollRef.current.querySelectorAll("[data-start-min]");
      let closest: Element | null = null;
      let bestDiff = Infinity;
      groups.forEach((el) => {
        const min = Number(el.getAttribute("data-start-min"));
        const diff = Math.abs(min - scrollToMin);
        if (diff < bestDiff) {
          bestDiff = diff;
          closest = el;
        }
      });
      if (closest) {
        (closest as Element).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [open, scrollToMin]);

  const groups = groupByStartTime(shifts);

  if (!open) return null;

  return (
    <Box
      w="360px"
      h="462px"
      bg="white"
      borderRadius="12px"
      pb="20px"
      boxShadow="0 12px 40px rgba(0,0,0,0.15)"
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      <Flex
        px="20px"
        py="16px"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="borderDefault"
        flexShrink={0}
      >
        <Text fontSize="lg" fontWeight="700" color="textPrimary">
          {dayLabel}
        </Text>
        <Box as="button" cursor="pointer" onClick={onClose} display="flex">
          <CloseCircle size={22} color="#8492A6" />
        </Box>
      </Flex>

      <Box ref={scrollRef} flex="1" overflowY="auto" px="20px" py="16px">
        {groups.length === 0 && (
          <Text fontSize="md" color="textMuted" textAlign="center" mt="40px">
            No shifts for this day
          </Text>
        )}

        {groups.map((group) => (
          <Box key={group.label} mb="20px" data-start-min={group.startMin}>
            <Text
              fontSize="sm"
              fontWeight="600"
              color="textMuted"
              mb="8px"
              textTransform="uppercase"
              letterSpacing="0.04em"
            >
              {group.label}
            </Text>

            <Flex direction="column" gap="8px">
              {group.shifts.map((shift) => {
                const tokens = resolveColor(shift.color);
                const startMin = getMinutesFromIso(shift.start);
                const endMin = getMinutesFromIso(shift.end);

                return (
                  <Box
                    key={shift.id}
                    bg={tokens.bg}
                    border="1px solid"
                    borderColor={tokens.border}
                    borderRadius="md"
                    px="12px"
                    py="10px"
                  >
                    <Flex align="flex-start" gap="8px">
                      <Flex
                        w="28px"
                        h="28px"
                        borderRadius="50%"
                        bg="white"
                        align="center"
                        justify="center"
                        flexShrink={0}
                        mt="2px"
                        style={{
                          border: `1.5px solid var(--colors-${tokens.border})`,
                        }}
                      >
                        <Text
                          fontSize="10px"
                          fontWeight="700"
                          color="textMuted"
                        >
                          {shift.tag}
                        </Text>
                      </Flex>
                      <Box flex="1" minW="0">
                        <Text
                          fontSize="sm"
                          fontWeight="600"
                          color="textPrimary"
                          lineHeight="1.3"
                        >
                          {shift.title}{" "}
                          <Text
                            as="span"
                            fontSize="xs"
                            fontWeight="400"
                            color="textMuted"
                          >
                            {displayTime(startMin)} - {displayTime(endMin)}
                          </Text>
                        </Text>
                        {shift.staffName && (
                          <Text fontSize="xs" color={tokens.border} mt="2px">
                            {shift.staffName}
                          </Text>
                        )}
                      </Box>
                    </Flex>
                  </Box>
                );
              })}
            </Flex>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
