"use client";

import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Filter, Lock, Add, ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import { LuChevronDown } from "react-icons/lu";

interface Appointment {
  id: string;
  column: number;
  startSlot: number;
  spanSlots: number;
  title: string;
  time: string;
  staff: string;
  tag: string;
  tagColor: string;
  bgColor: string;
  borderColor: string;
}

const appointments: Appointment[] = [
  {
    id: "1",
    column: 0,
    startSlot: 0,
    spanSlots: 3,
    title: "Surgery",
    time: "11:00 - 13:00",
    staff: "Hakan de Gast",
    tag: "HG",
    tagColor: "#10B981",
    bgColor: "#F0FDF4",
    borderColor: "#86EFAC",
  },
  {
    id: "2",
    column: 1,
    startSlot: 0,
    spanSlots: 2,
    title: "Pijnspecialist",
    time: "11:00 - 12:00",
    staff: "Diana Larte",
    tag: "DL",
    tagColor: "#F59E0B",
    bgColor: "#FFFBEB",
    borderColor: "#FCD34D",
  },
  {
    id: "3",
    column: 2,
    startSlot: 1,
    spanSlots: 2,
    title: "Pijnspecialist",
    time: "11:30 - 13:30",
    staff: "Diana Larte",
    tag: "HG",
    tagColor: "#3B82F6",
    bgColor: "#EFF6FF",
    borderColor: "#93C5FD",
  },
  {
    id: "4",
    column: 3,
    startSlot: 0,
    spanSlots: 2,
    title: "Pijnspecialist",
    time: "16:00 - 00:00",
    staff: "",
    tag: "HG",
    tagColor: "#EF4444",
    bgColor: "#FEF2F2",
    borderColor: "#FCA5A5",
  },
  {
    id: "5",
    column: 4,
    startSlot: 0,
    spanSlots: 2,
    title: "Pijnspecialist",
    time: "11:30 - 13:30",
    staff: "Diana Larte",
    tag: "HG",
    tagColor: "#EF4444",
    bgColor: "#FEF2F2",
    borderColor: "#FCA5A5",
  },
  {
    id: "6",
    column: 2,
    startSlot: 4,
    spanSlots: 2,
    title: "Pijnspecialist",
    time: "13:00 - 15:00",
    staff: "Halco de Gast",
    tag: "HG",
    tagColor: "#8B5CF6",
    bgColor: "#F5F3FF",
    borderColor: "#C4B5FD",
  },
];

const columns = [
  "Days",
  "Behandelingskamer1",
  "Management",
  "Bijzonderheden-Verlof-Cursus-...",
  "Financien",
];

const timeSlots = ["11:00", "11:30", "12:00", "12:30", "13:00", "13:30"];

function AppointmentCard({ appt }: { appt: Appointment }) {
  return (
    <Box
      position="absolute"
      top={`${appt.startSlot * 80}px`}
      left="4px"
      right="4px"
      height={`${appt.spanSlots * 80 - 8}px`}
      bg={appt.bgColor}
      border={`1px solid ${appt.borderColor}`}
      borderLeft={`3px solid ${appt.borderColor}`}
      borderRadius="6px"
      p="8px"
      overflow="hidden"
      cursor="pointer"
      transition="box-shadow 0.15s"
      _hover={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
      zIndex={2}
    >
      <Flex align="center" gap="6px" mb="4px">
        <Box
          px="6px"
          py="1px"
          borderRadius="4px"
          bg={appt.tagColor}
          flexShrink={0}
        >
          <Text fontSize="10px" fontWeight="700" color="white">
            {appt.tag}
          </Text>
        </Box>
      </Flex>
      <Text fontSize="12px" fontWeight="600" color="#1A1A2E" lineHeight="1.3">
        {appt.title}
      </Text>
      <Text fontSize="11px" color="#8492A6" mt="2px">
        {appt.time}
      </Text>
      {appt.staff && (
        <Text fontSize="11px" color="#3B82F6" mt="2px">
          {appt.staff}
        </Text>
      )}
    </Box>
  );
}

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
        <Text fontSize="22px" fontWeight="700" color="#1A1A2E">
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
            <Text fontSize="13px" fontWeight="500" color="#3C4858">
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
            bg="#4F46E5"
            cursor="pointer"
            _hover={{ bg: "#4338CA" }}
            transition="background 0.15s"
          >
            <Add size={16} color="white" />
            <Text fontSize="13px" fontWeight="500" color="white">
              Nieuw
            </Text>
            <LuChevronDown size={14} color="white" />
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
          <Box
            px="12px"
            py="3px"
            borderRadius="12px"
            bg="#FF4D4F"
          >
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
            <Flex alignItems="baseline" gap="8px">
              <Text fontSize="20px" fontWeight="700" color="#1A1A2E">
                Mon 8
              </Text>
              <Text fontSize="16px" fontWeight="500" color="#3C4858">
                Sept, 2025
              </Text>
            </Flex>
            <Box cursor="pointer" _hover={{ opacity: 0.7 }}>
              <Filter size={18} color="#8492A6" variant="Linear" />
            </Box>
          </Flex>

          <Flex alignItems="center" gap="10px">
            <Flex alignItems="center" gap="4px">
              <Box
                as="button"
                w="28px"
                h="28px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="6px"
                border="1px solid #D9E5F2"
                bg="white"
                cursor="pointer"
                _hover={{ bg: "#F7F9FC" }}
              >
                <ArrowLeft2 size={14} color="#3C4858" />
              </Box>
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
                borderRadius="6px"
                border="1px solid #D9E5F2"
                bg="white"
                cursor="pointer"
                _hover={{ bg: "#F7F9FC" }}
              >
                <ArrowRight2 size={14} color="#3C4858" />
              </Box>
            </Flex>

            <Box w="1px" h="20px" bg="#D9E5F2" />

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
              <Text fontSize="12px" fontWeight="500" color="#3C4858">
                This day
              </Text>
              <LuChevronDown size={12} color="#8492A6" />
            </Flex>

            <Box w="1px" h="20px" bg="#D9E5F2" />

            <Flex
              as="button"
              align="center"
              gap="4px"
              px="12px"
              py="5px"
              borderRadius="6px"
              border="1px solid #4F46E5"
              bg="#F0F0FF"
              cursor="pointer"
              _hover={{ bg: "#E8E7FF" }}
            >
              <Text fontSize="12px" fontWeight="600" color="#4F46E5">
                Publish All
              </Text>
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
              <Add size={14} color="#3C4858" />
              <Text fontSize="12px" fontWeight="500" color="#3C4858">
                Lock Shift
              </Text>
              <Lock size={14} color="#8492A6" variant="Linear" />
            </Flex>
          </Flex>
        </Flex>

        {/* ── Calendar Grid ── */}
        <Box
          borderRadius="12px"
          border="1px solid #D9E5F2"
          bg="white"
          overflow="hidden"
        >
          {/* Column Headers */}
          <Flex borderBottom="1px solid #D9E5F2" bg="#FAFBFC">
            {/* Time spacer */}
            <Box
              w="70px"
              flexShrink={0}
              borderRight="1px solid #D9E5F2"
            />
            {columns.map((col, i) => (
              <Box
                key={col}
                flex="1"
                py="10px"
                px="12px"
                borderRight={i < columns.length - 1 ? "1px solid #D9E5F2" : "none"}
                textAlign="center"
              >
                <Text
                  fontSize="12px"
                  fontWeight="600"
                  color="#3C4858"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {col}
                </Text>
              </Box>
            ))}
          </Flex>

          <Flex>
            <Box w="70px" flexShrink={0} borderRight="1px solid #D9E5F2">
              {timeSlots.map((time) => (
                <Box
                  key={time}
                  h="80px"
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="flex-end"
                  pr="12px"
                  pt="4px"
                  borderBottom="1px solid #F0F4F8"
                >
                  <Text fontSize="11px" fontWeight="500" color="#8492A6">
                    {time}
                  </Text>
                </Box>
              ))}
            </Box>

            {columns.map((col, colIndex) => (
              <Box
                key={col}
                flex="1"
                position="relative"
                borderRight={colIndex < columns.length - 1 ? "1px solid #D9E5F2" : "none"}
              >
                {timeSlots.map((time, slotIdx) => (
                  <Box
                    key={time}
                    h="80px"
                    borderBottom={
                      slotIdx < timeSlots.length - 1
                        ? "1px solid #F0F4F8"
                        : "none"
                    }
                  />
                ))}

                {appointments
                  .filter((a) => a.column === colIndex)
                  .map((appt) => (
                    <AppointmentCard key={appt.id} appt={appt} />
                  ))}
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
