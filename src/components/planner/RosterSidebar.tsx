"use client";

import { useState, useMemo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { SearchNormal1, FilterSearch } from "iconsax-reactjs";
import type { RosterPerson, RosterTab } from "@/types/planner";

interface RosterSidebarProps {
  people: RosterPerson[];
  onClose?: () => void;
}

const WEEKDAY_STYLE: Record<string, { bg: string; color: string }> = {
  m: { bg: "#EBFFEF", color: "#37A55C" },
  di: { bg: "#EBFFEF", color: "#37A55C" },
  w: { bg: "#EBFFEF", color: "#37A55C" },
  do: { bg: "#FFEFE7", color: "#F55300" },
  vr: { bg: "#FFEFE7", color: "#F55300" },
};

const ON_LEAVE_BG = "#FEECEC";
const ON_LEAVE_COLOR = "#EF2E2E";

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
      w="310px"
      minW="310px"
      bg="white"
      borderRadius="16px"
      border="2px solid"
      borderColor="borderDefault"
      overflow="hidden"
      alignSelf="stretch"
    >
      <Flex
        px="24px"
        py="14px"
        alignItems="center"
        gap="20px"
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
          <Image src="/assets/Icon.svg" alt="expand" width={16} height={16} />
        </Box>
        <Box w="1px" h="18px" bg="borderDefault" />
        <Text
          fontSize="md"
          fontWeight="700"
          fontFamily="body"
          color="textPrimary"
        >
          Roster
        </Text>
      </Flex>

      <Flex px="24px" py="10px" gap="8px" alignItems="center">
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
        px="24px"
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
              gap="6px"
              px="8px"
              pb="8px"
              pt="4px"
              cursor="pointer"
              borderBottom="2px solid"
              borderColor={active ? "#5653FC" : "transparent"}
              onClick={() => setActiveTab(tab.key)}
              transition="border-color 0.15s"
            >
              <Text
                fontSize="xs"
                fontWeight="600"
                fontFamily="body"
                style={{ color: active ? "#5653FC" : "#8492A6" }}
              >
                {tab.label}
              </Text>
              <Flex
                w="20px"
                h="20px"
                borderRadius="50%"
                align="center"
                justify="center"
                border="1px solid"
                borderColor={active ? "#5653FC" : "borderDefault"}
              >
                <Text
                  fontSize="10px"
                  fontWeight="700"
                  style={{ color: active ? "#5653FC" : "#8492A6" }}
                >
                  {tab.count}
                </Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>

      {/* Person list */}
      <Box maxH="680px" overflowY="auto" px="16px" py="8px">
        {filtered.map((person, idx) => (
          <Box
            key={person.id}
            mb="6px"
            px="10px"
            py="10px"
            borderRadius="md"
            border="1px solid"
            borderColor="borderDefault"
            cursor="pointer"
            _hover={{ bg: "surface" }}
            transition="background 0.1s"
          >
            <Flex gap="8px" align="flex-start">
              {idx % 2 === 0 ? (
                <Flex
                  w="32px"
                  h="32px"
                  borderRadius="50%"
                  bg="surfaceSoft"
                  align="center"
                  justify="center"
                  flexShrink={0}
                  mt="2px"
                >
                  <Text fontSize="xs" fontWeight="600" color="textSecondary">
                    {person.initials}
                  </Text>
                </Flex>
              ) : (
                <Box w="32px" flexShrink={0} />
              )}

              <Box flex="1" minW="0">
                <Flex align="center" justify="space-between" mb="2px">
                  <Text
                    fontSize="xs"
                    fontWeight="600"
                    color="textPrimary"
                    lineHeight="1.3"
                    fontFamily="body"
                  >
                    {person.name}
                  </Text>
                  {person.status === "on-leave" && (
                    <Flex
                      align="center"
                      gap="4px"
                      px="6px"
                      py="2px"
                      borderRadius="10px"
                      style={{ backgroundColor: ON_LEAVE_BG }}
                    >
                      <Box
                        w="5px"
                        h="5px"
                        borderRadius="50%"
                        style={{ backgroundColor: ON_LEAVE_COLOR }}
                      />
                      <Text
                        fontSize="10px"
                        fontWeight="600"
                        style={{ color: ON_LEAVE_COLOR }}
                      >
                        On leave
                      </Text>
                    </Flex>
                  )}
                </Flex>

                <Flex gap="6px" mb="3px" align="center" justify="space-between">
                  <Flex gap="6px" align="center">
                    <Text fontSize="10px" color="textMuted" fontFamily="body">
                      <Text as="span" fontWeight="600" color="textSecondary">
                        {person.contractHours.toFixed(1)}
                      </Text>
                      hrs
                    </Text>
                    <Text fontSize="10px" color="textMuted" fontFamily="body">
                      <Text as="span" fontWeight="600" color="textSecondary">
                        {person.workedHours.toFixed(1)}
                      </Text>
                      hrs
                    </Text>
                  </Flex>

                  <Flex gap="3px" flexShrink={0}>
                    {person.weekDays.map((day, i) => {
                      const pill = WEEKDAY_STYLE[day.label] ?? {
                        bg: "#F9FAFB",
                        color: "#8492A6",
                      };
                      return (
                        <Flex
                          key={i}
                          w="22px"
                          h="20px"
                          borderRadius="50%"
                          align="center"
                          justify="center"
                          style={{ backgroundColor: pill.bg }}
                        >
                          <Text
                            fontSize="10px"
                            fontWeight="600"
                            style={{ color: pill.color }}
                          >
                            {day.label}
                          </Text>
                        </Flex>
                      );
                    })}
                  </Flex>
                </Flex>

                {/* Date range */}
                <Text
                  fontSize="10px"
                  fontWeight="600"
                  fontFamily="body"
                  style={{
                    color:
                      person.status === "on-leave" ? ON_LEAVE_COLOR : "#37A55C",
                  }}
                >
                  {person.dateRange}
                </Text>
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
