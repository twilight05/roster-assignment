"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { Filter, Add, ArrowLeft2, ArrowRight2, People } from "iconsax-reactjs";
import { LuChevronDown } from "react-icons/lu";
import TimeColumn from "@/components/planner/TimeColumn";
import DepartmentColumn from "@/components/planner/DepartmentColumn";
import { departments, scheduleData } from "@/data/planner";

const SLOT_MINUTES = 30;
const SLOT_HEIGHT = 120;

const GRID_START_MIN = 11 * 60;
const GRID_END_MIN = 16 * 60;
const TOTAL_SLOTS = Math.floor((GRID_END_MIN - GRID_START_MIN) / SLOT_MINUTES);

export default function PlannerPage() {
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
            <LuChevronDown size={14} color="var(--colors-text-secondary)" />
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
            <Add size={16} color="var(--colors-text-secondary)" />
            <Text
              fontFamily="body"
              fontSize="md"
              fontWeight="600"
              lineHeight="100%"
              color="textSecondary"
            >
              Nieuw
            </Text>
            <LuChevronDown size={14} color="var(--colors-text-secondary)" />
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
          <Box px="12px" py="3px" borderRadius="md" bg="liveChip">
            <Text fontSize="sm" fontWeight="700" color="white">
              Live
            </Text>
          </Box>
          <Text fontSize="13px" fontWeight="600" color="textSecondary">
            Planner
          </Text>
          <Text fontSize="13px" color="textMuted">
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
                  Mon
                </Text>
                <Text
                  fontSize="13px"
                  fontWeight="600"
                  color="textPrimary"
                  fontFamily="body"
                >
                  8
                </Text>
              </Flex>

              <Text
                fontSize="lg"
                fontWeight="500"
                color="textPrimary"
                fontFamily="body"
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
              borderRadius="xs"
              border="1px solid"
              borderColor="borderDefault"
              bg="white"
              cursor="pointer"
              _hover={{ bg: "surface" }}
            >
              <People
                size={18}
                color="var(--colors-text-muted)"
                variant="Linear"
              />
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
              <Filter
                size={18}
                color="var(--colors-text-muted)"
                variant="Linear"
              />
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
              >
                <ArrowLeft2 size={14} color="var(--colors-text-secondary)" />
              </Box>

              <Flex
                as="button"
                align="center"
                px="12px"
                py="5px"
                cursor="pointer"
                _hover={{ bg: "surface" }}
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
              >
                <ArrowRight2 size={14} color="var(--colors-text-secondary)" />
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
            >
              <Box
                w="8px"
                h="8px"
                borderRadius="50%"
                bg="greenDot"
                flexShrink={0}
              />
              <Text fontSize="sm" fontWeight="500" color="textSecondary">
                This day
              </Text>
              <LuChevronDown size={12} color="var(--colors-text-muted)" />
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
              <Add size={14} color="var(--colors-text-secondary)" />
              <Text fontSize="sm" fontWeight="500" color="textSecondary">
                Lock Shift
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Box
          maxW="1120px"
          w="full"
          borderRadius="md"
          border="1px solid"
          borderColor="borderDefault"
          bg="white"
          overflow="hidden"
        >
          <Box maxH="884px" overflowY="auto">
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
                  key={dept}
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
