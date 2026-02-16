"use client";

import { useState, useMemo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { SearchNormal1, FilterSearch, ExportSquare } from "iconsax-reactjs";
import type { RosterPerson, RosterTab, DayDotColor } from "@/types/planner";

interface RosterSidebarProps {
  people: RosterPerson[];
  onClose?: () => void;
}

const DAY_COLOR_HEX: Record<DayDotColor, string> = {
  red: "#EF4444",
  green: "#10B981",
  orange: "#F59E0B",
  blue: "#3B82F6",
  gray: "#D1D5DB",
};

const DAY_BG_HEX: Record<DayDotColor, string> = {
  red: "#FEF2F2",
  green: "#F1FBF4",
  orange: "#FFFBEB",
  blue: "#EFF6FF",
  gray: "#F9FAFB",
};

export default function RosterSidebar({ people, onClose }: RosterSidebarProps) {
  const [activeTab, setActiveTab] = useState<RosterTab>("on-leave");
  const [search, setSearch] = useState("");

  const counts = useMemo(() => {
    const all = people.length;
    const available = people.filter((p) => p.status === "available").length;
    const onLeave = people.filter((p) => p.status === "on-leave").length;
    return { all, available, onLeave };
  }, [people]);

  const filtered = useMemo(() => {
    let list = people;

    if (activeTab === "available") {
      list = list.filter((p) => p.status === "available");
    } else if (activeTab === "on-leave") {
      list = list.filter((p) => p.status === "on-leave");
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    return list;
  }, [people, activeTab, search]);

  const tabs: { key: RosterTab; label: string; count: number }[] = [
    { key: "all", label: "All", count: counts.all },
    { key: "available", label: "Available", count: counts.available },
    { key: "on-leave", label: "On Leave", count: counts.onLeave },
  ];

  return (
    <Box
      w="280px"
      minW="280px"
      bg="white"
      borderRadius="md"
      border="1px solid"
      borderColor="borderDefault"
      overflow="hidden"
      alignSelf="stretch"
    >
      <Flex
        px="16px"
        py="14px"
        alignItems="center"
        gap="8px"
        borderBottom="1px solid"
        borderColor="borderDefault"
      >
        <Box
          as="button"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          flexShrink={0}
          onClick={onClose}
        >
          <ExportSquare size={18} color="#3C4858" />
        </Box>
        <Box w="1px" h="18px" bg="borderDefault" />
        <Text fontSize="md" fontWeight="700" color="textPrimary">
          Roster
        </Text>
      </Flex>

      <Flex px="16px" py="10px" gap="8px" alignItems="center">
        <Flex
          flex="1"
          align="center"
          gap="8px"
          px="10px"
          py="7px"
          borderRadius="sm"
          border="1px solid"
          borderColor="borderDefault"
          bg="white"
        >
          <SearchNormal1 size={14} color="#8492A6" />
          <input
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "12px",
              color: "#3C4858",
              fontFamily: "inherit",
            }}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Flex>

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
          flexShrink={0}
          _hover={{ bg: "surface" }}
        >
          <FilterSearch size={14} color="#8492A6" />
        </Box>
      </Flex>

      {/* Tabs */}
      <Flex
        px="16px"
        gap="0"
        borderBottom="1px solid"
        borderColor="borderDefault"
      >
        {tabs.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <Flex
              key={tab.key}
              as="button"
              align="center"
              gap="4px"
              px="8px"
              pb="8px"
              pt="4px"
              cursor="pointer"
              borderBottom="2px solid"
              borderColor={active ? "greenDot" : "transparent"}
              onClick={() => setActiveTab(tab.key)}
              transition="border-color 0.15s"
            >
              <Text
                fontSize="xs"
                fontWeight={active ? "700" : "500"}
                color={active ? "textPrimary" : "textMuted"}
              >
                {tab.label}
              </Text>
              <Text
                fontSize="xs"
                fontWeight="600"
                color={active ? "greenDot" : "textMuted"}
              >
                {tab.count}
              </Text>
            </Flex>
          );
        })}
      </Flex>

      {/* Person list */}
      <Box maxH="680px" overflowY="auto" px="12px" py="8px">
        {filtered.map((person) => (
          <Box
            key={person.id}
            mb="8px"
            px="14px"
            py="14px"
            borderRadius="md"
            border="1px solid"
            borderColor="borderDefault"
            cursor="pointer"
            _hover={{ bg: "surface" }}
            transition="background 0.1s"
          >
            <Flex gap="10px" align="flex-start">
              <Flex
                w="36px"
                h="36px"
                borderRadius="50%"
                bg="surfaceSoft"
                align="center"
                justify="center"
                flexShrink={0}
                mt="2px"
              >
                <Text fontSize="xs" fontWeight="700" color="textSecondary">
                  {person.initials}
                </Text>
              </Flex>

              <Box flex="1" minW="0">
                <Flex align="center" justify="space-between" mb="4px">
                  <Text
                    fontSize="sm"
                    fontWeight="700"
                    color="textPrimary"
                    lineHeight="1.3"
                  >
                    {person.name}
                  </Text>
                  {person.status === "on-leave" && (
                    <Text fontSize="10px" fontWeight="600" color="schedRedTag">
                      • On leave
                    </Text>
                  )}
                </Flex>

                <Flex gap="10px" mb="4px" align="center">
                  <Text fontSize="10px" color="textMuted">
                    <Text as="span" fontWeight="700" color="textSecondary">
                      {person.contractHours.toFixed(1)}
                    </Text>
                    hrs
                  </Text>
                  <Text fontSize="10px" color="textMuted">
                    <Text as="span" fontWeight="700" color="textSecondary">
                      {person.workedHours.toFixed(1)}
                    </Text>
                    hrs
                  </Text>
                </Flex>

                {/* Date range */}
                <Text
                  fontSize="10px"
                  fontWeight="600"
                  color={
                    person.status === "on-leave" ? "schedRedTag" : "greenDot"
                  }
                  mb="8px"
                >
                  {person.dateRange}
                </Text>

                <Flex gap="6px">
                  {person.weekDays.map((day, i) => (
                    <Flex
                      key={i}
                      w="26px"
                      h="22px"
                      borderRadius="4px"
                      align="center"
                      justify="center"
                      style={{
                        backgroundColor: DAY_BG_HEX[day.color],
                      }}
                    >
                      <Text
                        fontSize="10px"
                        fontWeight="600"
                        style={{ color: DAY_COLOR_HEX[day.color] }}
                      >
                        {day.label}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
