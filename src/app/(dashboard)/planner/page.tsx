"use client";

import { useState, useMemo, useCallback } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Filter, Add, ArrowLeft2, ArrowRight2, People } from "iconsax-reactjs";
import { LuChevronDown } from "react-icons/lu";
import TimeColumn from "@/components/planner/TimeColumn";
import DepartmentColumn from "@/components/planner/DepartmentColumn";
import ShiftListPanel from "@/components/planner/ShiftListPanel";
import RosterSidebar from "@/components/planner/RosterSidebar";
import { departments, shifts, rosterPeople } from "@/data/planner";
import { shiftToCard } from "@/lib/shiftHelpers";
import type { ViewMode } from "@/types/planner";

const SLOT_MINUTES = 30;
const SLOT_HEIGHT = 120;

const GRID_START_MIN = 11 * 60;
const GRID_END_MIN = 18 * 60;
const TOTAL_SLOTS = Math.floor((GRID_END_MIN - GRID_START_MIN) / SLOT_MINUTES);

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
] as const;

function addDays(date: Date, offset: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + offset);
  return next;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function PlannerPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("live");
  const [selectedDay, setSelectedDay] = useState(() => new Date(2025, 8, 8));
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isToday = useMemo(
    () => isSameDay(selectedDay, new Date()),
    [selectedDay],
  );

  const dayLabel = useMemo(() => {
    const wd = WEEKDAYS[selectedDay.getDay()];
    const d = selectedDay.getDate();
    const mo = MONTHS[selectedDay.getMonth()];
    const yr = selectedDay.getFullYear();
    return { weekday: wd, date: d, monthYear: `${mo}, ${yr}` };
  }, [selectedDay]);

  const navigateDay = useCallback((offset: number) => {
    setIsLoading(true);
    setSelectedDay((prev) => addDays(prev, offset));
    // simulate async load
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  const goToToday = useCallback(() => {
    const now = new Date();
    setIsLoading(true);
    setSelectedDay(now);
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  // Side panel state
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelScrollMin, setPanelScrollMin] = useState<number | undefined>();

  const visibleShifts = useMemo(() => {
    const yy = selectedDay.getFullYear();
    const mm = String(selectedDay.getMonth() + 1).padStart(2, "0");
    const dd = String(selectedDay.getDate()).padStart(2, "0");
    const datePrefix = `${yy}-${mm}-${dd}`;

    return shifts.filter((s) => s.start.startsWith(datePrefix));
  }, [selectedDay]);

  const handleCardClick = useCallback(
    (cardId: string) => {
      const shift = visibleShifts.find((s) => s.id === cardId);
      if (!shift) return;
      const h = Number(shift.start.slice(11, 13));
      const m = Number(shift.start.slice(14, 16));
      setPanelScrollMin(h * 60 + m);
      setPanelOpen(true);
    },
    [visibleShifts],
  );

  const handleSeeAllClick = useCallback((slotIndex: number) => {
    const slotStartMin = GRID_START_MIN + slotIndex * SLOT_MINUTES;
    setPanelScrollMin(slotStartMin);
    setPanelOpen(true);
  }, []);

  const panelDayLabel = `${dayLabel.weekday} ${dayLabel.date} ${dayLabel.monthYear}`;

  return (
    <Box>
      <Flex
        h="70px"
        borderBottom="1px solid"
        borderColor="borderDefault"
        alignItems="center"
        justifyContent="space-between"
        px="30px"
        bg="white"
      >
        <Text
          fontFamily="body"
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
          letterSpacing="-0.02em"
          color="textPrimary"
        >
          Planner
        </Text>

        <Flex gap="12px" alignItems="center">
          <Flex
            as="button"
            align="center"
            gap="6px"
            px="16px"
            py="8px"
            borderRadius="sm"
            border="1px solid"
            borderColor="borderDefault"
            bg="white"
            cursor="pointer"
            _hover={{ bg: "surface" }}
            transition="background 0.15s"
          >
            <LuChevronDown size={14} color="#3C4858" />
            <Text
              fontFamily="body"
              fontSize="md"
              fontWeight="600"
              lineHeight="100%"
              color="textSecondary"
            >
              Open Days
            </Text>
          </Flex>

          <Flex
            as="button"
            align="center"
            gap="6px"
            px="16px"
            py="8px"
            borderRadius="sm"
            border="1px solid"
            borderColor="borderDefault"
            bg="white"
            cursor="pointer"
            _hover={{ bg: "surface" }}
            transition="background 0.15s"
          >
            <Add size={16} color="#3C4858" />
            <Text
              fontFamily="body"
              fontSize="md"
              fontWeight="600"
              lineHeight="100%"
              color="textSecondary"
            >
              Nieuw
            </Text>
            <LuChevronDown size={14} color="#3C4858" />
          </Flex>
        </Flex>
      </Flex>

      <Box p="20px" px="30px">
        <Flex
          h="40px"
          bg="liveBg"
          border="1px solid"
          borderColor="liveBorder"
          borderRadius="20px"
          alignItems="center"
          px="16px"
          gap="12px"
          mb="16px"
        >
          <Box
            as="button"
            px="12px"
            py="3px"
            borderRadius="md"
            bg={viewMode === "live" ? "modeChipLive" : "surfaceSoft"}
            cursor="pointer"
            onClick={() => {
              setViewMode("live");
              setPanelOpen(false);
              setSidebarOpen(true);
            }}
            transition="background 0.15s"
          >
            <Text
              fontSize="sm"
              fontWeight="700"
              color={viewMode === "live" ? "white" : "textMuted"}
            >
              Live
            </Text>
          </Box>
          <Box
            as="button"
            px="12px"
            py="3px"
            borderRadius="md"
            bg={viewMode === "planner" ? "modeChipPlanner" : "surfaceSoft"}
            cursor="pointer"
            onClick={() => {
              setViewMode("planner");
              setSidebarOpen(false);
              setPanelOpen(true);
            }}
            transition="background 0.15s"
          >
            <Text
              fontSize="sm"
              fontWeight="700"
              color={viewMode === "planner" ? "white" : "textMuted"}
            >
              Planner
            </Text>
          </Box>
          <Text fontSize="13px" color="textMuted">
            {viewMode === "live"
              ? "Description of the live"
              : "Description of the planner view"}
          </Text>
        </Flex>

        <Flex gap="16px" align="flex-start">
          {viewMode === "live" && sidebarOpen && (
            <RosterSidebar
              people={rosterPeople}
              onClose={() => setSidebarOpen(false)}
            />
          )}

          {/* Right: toolbar + grid */}
          <Box flex="1" minW="0">
            <Flex
              h="38px"
              alignItems="center"
              justifyContent="space-between"
              mb="16px"
            >
              <Flex alignItems="center" gap="16px">
                <Flex alignItems="center" gap="12px">
                  <Flex
                    align="center"
                    gap="4px"
                    px="12px"
                    py="4px"
                    borderRadius="14px"
                    bg="white"
                    border="1px solid"
                    borderColor="borderDefault"
                  >
                    <Text
                      fontSize="13px"
                      fontWeight="600"
                      color="textMuted"
                      fontFamily="body"
                    >
                      {dayLabel.weekday}
                    </Text>
                    <Text
                      fontSize="13px"
                      fontWeight="600"
                      color="textPrimary"
                      fontFamily="body"
                    >
                      {dayLabel.date}
                    </Text>
                  </Flex>

                  <Text
                    fontSize="lg"
                    fontWeight="500"
                    color="textPrimary"
                    fontFamily="body"
                  >
                    {dayLabel.monthYear}
                  </Text>
                </Flex>
              </Flex>

              <Flex alignItems="center" gap="10px">
                <Box
                  as="button"
                  w="32px"
                  h="32px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="xs"
                  border="1px solid"
                  borderColor="borderDefault"
                  bg={sidebarOpen ? "surface" : "white"}
                  cursor="pointer"
                  _hover={{ bg: "surface" }}
                  onClick={() => setSidebarOpen((v) => !v)}
                >
                  <People size={18} color="#8492A6" variant="Linear" />
                </Box>

                <Box
                  as="button"
                  w="32px"
                  h="32px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="xs"
                  border="1px solid"
                  borderColor="borderDefault"
                  bg="white"
                  cursor="pointer"
                  _hover={{ bg: "surface" }}
                >
                  <Filter size={18} color="#8492A6" variant="Linear" />
                </Box>

                <Flex
                  alignItems="center"
                  gap="0"
                  borderRadius="xs"
                  border="1px solid"
                  borderColor="borderDefault"
                  bg="white"
                  overflow="hidden"
                >
                  <Box
                    as="button"
                    w="28px"
                    h="28px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    _hover={{ bg: "surface" }}
                    borderRight="1px solid"
                    borderColor="borderDefault"
                    onClick={() => navigateDay(-1)}
                  >
                    <ArrowLeft2 size={14} color="#3C4858" />
                  </Box>

                  <Flex
                    as="button"
                    align="center"
                    px="12px"
                    py="5px"
                    cursor="pointer"
                    _hover={{ bg: "surface" }}
                    onClick={goToToday}
                  >
                    <Text fontSize="sm" fontWeight="500" color="textSecondary">
                      Current day
                    </Text>
                  </Flex>

                  <Box
                    as="button"
                    w="28px"
                    h="28px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    _hover={{ bg: "surface" }}
                    borderLeft="1px solid"
                    borderColor="borderDefault"
                    onClick={() => navigateDay(1)}
                  >
                    <ArrowRight2 size={14} color="#3C4858" />
                  </Box>
                </Flex>

                <Flex
                  as="button"
                  align="center"
                  gap="6px"
                  px="12px"
                  py="5px"
                  borderRadius="xs"
                  border="1px solid"
                  borderColor="borderDefault"
                  bg="white"
                  cursor="pointer"
                  _hover={{ bg: "surface" }}
                  onClick={goToToday}
                >
                  <Box
                    w="8px"
                    h="8px"
                    borderRadius="50%"
                    bg={isToday ? "greenDot" : "textMuted"}
                    flexShrink={0}
                  />
                  <Text fontSize="sm" fontWeight="500" color="textSecondary">
                    This day
                  </Text>
                  <LuChevronDown size={12} color="#8492A6" />
                </Flex>

                <Flex
                  as="button"
                  align="center"
                  gap="4px"
                  px="12px"
                  py="5px"
                  borderRadius="xs"
                  border="1px solid"
                  borderColor="borderDefault"
                  bg="white"
                  cursor="pointer"
                  _hover={{ bg: "surface" }}
                >
                  <Text fontSize="sm" fontWeight="600" color="textSecondary">
                    Publish All
                  </Text>
                </Flex>

                <Flex
                  as="button"
                  align="center"
                  gap="4px"
                  px="12px"
                  py="5px"
                  borderRadius="xs"
                  border="1px solid"
                  borderColor="borderDefault"
                  bg="white"
                  cursor="pointer"
                  _hover={{ bg: "surface" }}
                >
                  <Add size={14} color="#3C4858" />
                  <Text fontSize="sm" fontWeight="500" color="textSecondary">
                    Lock Shift
                  </Text>
                </Flex>
              </Flex>
            </Flex>

            <Box
              w="full"
              borderRadius="md"
              border="1px solid"
              borderColor="borderDefault"
              bg="white"
              overflowX="auto"
            >
              <Box
                minW="1100px"
                maxH="884px"
                overflowY="auto"
                opacity={isLoading ? 0.5 : 1}
                transition="opacity 0.2s"
              >
                <Box
                  position="sticky"
                  top="0"
                  zIndex={20}
                  borderBottom="1px solid"
                  borderColor="borderDefault"
                  bg="surface"
                  display="grid"
                  gridTemplateColumns="80px repeat(4, 1fr)"
                >
                  <Box
                    py="10px"
                    px="12px"
                    borderRight="1px solid"
                    borderColor="borderDefault"
                    display="flex"
                    alignItems="center"
                  >
                    <Box
                      px="12px"
                      py="3px"
                      borderRadius="md"
                      bg="daysBadgeBg"
                      border="1px solid"
                      borderColor="daysBadgeBorder"
                    >
                      <Text fontSize="sm" fontWeight="600" color="greenDot">
                        Days
                      </Text>
                    </Box>
                  </Box>

                  {departments.map((dept, i) => (
                    <Box
                      key={dept.id}
                      py="10px"
                      px="12px"
                      borderRight={
                        i < departments.length - 1 ? "1px solid" : "none"
                      }
                      borderColor="borderDefault"
                      display="flex"
                      alignItems="center"
                    >
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="textSecondary"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {dept.name}
                      </Text>
                    </Box>
                  ))}
                </Box>

                <Box display="grid" gridTemplateColumns="80px repeat(4, 1fr)">
                  <TimeColumn
                    gridStartMin={GRID_START_MIN}
                    totalSlots={TOTAL_SLOTS}
                    slotMinutes={SLOT_MINUTES}
                    slotHeight={SLOT_HEIGHT}
                  />

                  {departments.map((dept, idx) => (
                    <DepartmentColumn
                      key={dept.id}
                      totalSlots={TOTAL_SLOTS}
                      slotHeight={SLOT_HEIGHT}
                      slotMinutes={SLOT_MINUTES}
                      gridStartMin={GRID_START_MIN}
                      gridEndMin={GRID_END_MIN}
                      cards={visibleShifts
                        .filter((s) => s.departmentId === dept.id)
                        .map(shiftToCard)}
                      seeAll={
                        idx === 0
                          ? { slotIndex: 2, laneIndex: 2, laneCount: 3 }
                          : undefined
                      }
                      showBorderRight={idx < departments.length - 1}
                      onCardClick={handleCardClick}
                      onSeeAllClick={handleSeeAllClick}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Flex>

        {/* Shift list modal */}
        {panelOpen && (
          <Box
            position="fixed"
            top="0"
            left="0"
            w="100vw"
            h="100vh"
            bg="blackAlpha.400"
            zIndex={45}
            onClick={() => setPanelOpen(false)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box onClick={(e) => e.stopPropagation()}>
              <ShiftListPanel
                open={panelOpen}
                onClose={() => setPanelOpen(false)}
                dayLabel={panelDayLabel}
                shifts={visibleShifts}
                scrollToMin={panelScrollMin}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
