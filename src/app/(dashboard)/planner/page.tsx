"use client";

import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Filter, Add, ArrowLeft2, ArrowRight2, People } from "iconsax-reactjs";
import { LuChevronDown } from "react-icons/lu";
import TimeColumn from "@/components/planner/TimeColumn";
import DepartmentColumn from "@/components/planner/DepartmentColumn";
import type { CardData } from "@/components/planner/DepartmentColumn";

const SLOT_MINUTES = 30;
const SLOT_HEIGHT = 120;

const GRID_START_MIN = 11 * 60; // 11:00
const GRID_END_MIN = 16 * 60; // 16:00
const TOTAL_SLOTS = Math.floor((GRID_END_MIN - GRID_START_MIN) / SLOT_MINUTES);

const departments = [
  "Behandelingskamer1",
  "Management",
  "Bijzonderheden-Verlof-Cursus-...",
  "Financien",
];

const scheduleData: Record<number, CardData[]> = {
  0: [
    {
      id: "1",
      title: "Surgery",
      startMin: 660,
      endMin: 780,
      staff: "Hakan de Gast",
      tag: "HG",
      tagColor: "#E35F00",
      bgColor: "#FDF5F0",
      borderColor: "#FDBA74",
      subColumn: "left",
    },
    {
      id: "2",
      title: "Pijnspecialist",
      startMin: 660,
      endMin: 810,
      staff: "Diana Larte",
      tag: "DL",
      tagColor: "#19C34C",
      bgColor: "#F1FBF4",
      borderColor: "#86EFAC",
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
      tagColor: "#3B82F6",
      bgColor: "#EFF6FF",
      borderColor: "#93C5FD",
    },
    {
      id: "6",
      title: "Pijnspecialist",
      startMin: 780,
      endMin: 900,
      staff: "Halco de Gast",
      tag: "HG",
      tagColor: "#8B5CF6",
      bgColor: "#F5F3FF",
      borderColor: "#C4B5FD",
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
      tagColor: "#EF4444",
      bgColor: "#FEF2F2",
      borderColor: "#FCA5A5",
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
      tagColor: "#EF4444",
      bgColor: "#FEF2F2",
      borderColor: "#FCA5A5",
    },
  ],
};

export default function PlannerPage() {
  return (
    <Box>
      <Flex
        h="70px"
        borderBottom="1px solid #D9E5F2"
        alignItems="center"
        justifyContent="space-between"
        px="30px"
        bg="#FFFFFF"
      >
        <Text
          fontFamily="'Manrope', sans-serif"
          fontSize="24px"
          fontWeight="700"
          lineHeight="100%"
          letterSpacing="-0.02em"
          color="#1A1A2E"
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
            borderRadius="8px"
            border="1px solid #D9E5F2"
            bg="white"
            cursor="pointer"
            _hover={{ bg: "#F7F9FC" }}
            transition="background 0.15s"
          >
            <LuChevronDown size={14} color="#3C4858" />
            <Text
              fontFamily="'Manrope', sans-serif"
              fontSize="14px"
              fontWeight="600"
              lineHeight="100%"
              color="#3C4858"
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
            borderRadius="8px"
            border="1px solid #D9E5F2"
            bg="white"
            cursor="pointer"
            _hover={{ bg: "#F7F9FC" }}
            transition="background 0.15s"
          >
            <Add size={16} color="#3C4858" />
            <Text
              fontFamily="'Manrope', sans-serif"
              fontSize="14px"
              fontWeight="600"
              lineHeight="100%"
              color="#3C4858"
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
          bg="#FFF5F5"
          border="1px solid #FF6669"
          borderRadius="20px"
          alignItems="center"
          px="16px"
          gap="12px"
          mb="16px"
        >
          <Box px="12px" py="3px" borderRadius="12px" bg="#FF4D4F">
            <Text fontSize="12px" fontWeight="700" color="white">
              Live
            </Text>
          </Box>
          <Text fontSize="13px" fontWeight="600" color="#3C4858">
            Planner
          </Text>
          <Text fontSize="13px" color="#8492A6">
            Description of the live
          </Text>
        </Flex>

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
                bg="#FFFFFF"
                border="1px solid #D9E5F2"
              >
                <Text
                  fontSize="13px"
                  fontWeight="600"
                  color="#8492A6"
                  fontFamily="'Manrope', sans-serif"
                >
                  Mon
                </Text>
                <Text
                  fontSize="13px"
                  fontWeight="600"
                  color="#242424"
                  fontFamily="'Manrope', sans-serif"
                >
                  8
                </Text>
              </Flex>

              <Text
                fontSize="16px"
                fontWeight="500"
                color="#242424"
                fontFamily="'Manrope', sans-serif"
              >
                Sept, 2025
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
              borderRadius="6px"
              border="1px solid #D9E5F2"
              bg="white"
              cursor="pointer"
              _hover={{ bg: "#F7F9FC" }}
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
              borderRadius="6px"
              border="1px solid #D9E5F2"
              bg="white"
              cursor="pointer"
              _hover={{ bg: "#F7F9FC" }}
            >
              <Filter size={18} color="#8492A6" variant="Linear" />
            </Box>

            <Flex
              alignItems="center"
              gap="0"
              borderRadius="6px"
              border="1px solid #D9E5F2"
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
                _hover={{ bg: "#F7F9FC" }}
                borderRight="1px solid #D9E5F2"
              >
                <ArrowLeft2 size={14} color="#3C4858" />
              </Box>

              <Flex
                as="button"
                align="center"
                px="12px"
                py="5px"
                cursor="pointer"
                _hover={{ bg: "#F7F9FC" }}
              >
                <Text fontSize="12px" fontWeight="500" color="#3C4858">
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
                _hover={{ bg: "#F7F9FC" }}
                borderLeft="1px solid #D9E5F2"
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
              borderRadius="6px"
              border="1px solid #D9E5F2"
              bg="white"
              cursor="pointer"
              _hover={{ bg: "#F7F9FC" }}
            >
              <Box
                w="8px"
                h="8px"
                borderRadius="50%"
                bg="#10B981"
                flexShrink={0}
              />
              <Text fontSize="12px" fontWeight="500" color="#3C4858">
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
              borderRadius="6px"
              border="1px solid #D9E5F2"
              bg="white"
              cursor="pointer"
              _hover={{ bg: "#F7F9FC" }}
            >
              <Text fontSize="12px" fontWeight="600" color="#3C4858">
                Publish All
              </Text>
            </Flex>

            <Flex
              as="button"
              align="center"
              gap="4px"
              px="12px"
              py="5px"
              borderRadius="6px"
              border="1px solid #D9E5F2"
              bg="white"
              cursor="pointer"
              _hover={{ bg: "#F7F9FC" }}
            >
              <Add size={14} color="#3C4858" />
              <Text fontSize="12px" fontWeight="500" color="#3C4858">
                Lock Shift
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Box
          maxW="1120px"
          w="full"
          borderRadius="12px"
          border="1px solid #D9E5F2"
          bg="white"
          overflow="hidden"
        >
          <Box maxH="884px" overflowY="auto">
            <Box
              position="sticky"
              top="0"
              zIndex={20}
              borderBottom="1px solid #D9E5F2"
              bg="#FAFBFC"
              display="grid"
              gridTemplateColumns="80px repeat(4, 1fr)"
            >
              <Box
                py="10px"
                px="12px"
                borderRight="1px solid #D9E5F2"
                display="flex"
                alignItems="center"
              >
                <Box
                  px="12px"
                  py="3px"
                  borderRadius="12px"
                  bg="#E6F9F0"
                  border="1px solid #B2EDCE"
                >
                  <Text fontSize="12px" fontWeight="600" color="#10B981">
                    Days
                  </Text>
                </Box>
              </Box>

              {departments.map((dept, i) => (
                <Box
                  key={dept}
                  py="10px"
                  px="12px"
                  borderRight={
                    i < departments.length - 1 ? "1px solid #D9E5F2" : "none"
                  }
                  display="flex"
                  alignItems="center"
                >
                  <Text
                    fontSize="12px"
                    fontWeight="600"
                    color="#3C4858"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {dept}
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
                  key={dept}
                  totalSlots={TOTAL_SLOTS}
                  slotHeight={SLOT_HEIGHT}
                  slotMinutes={SLOT_MINUTES}
                  gridStartMin={GRID_START_MIN}
                  gridEndMin={GRID_END_MIN}
                  cards={scheduleData[idx] || []}
                  seeAll={
                    idx === 0 ? { slotIndex: 2, subColumn: "right" } : undefined
                  }
                  showBorderRight={idx < departments.length - 1}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
