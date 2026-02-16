"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { CSSProperties } from "react";

interface ScheduleCardProps {
  title: string;
  timeLabel: string;
  staff: string;
  tag: string;
  tagColor: string;
  bgColor: string;
  borderColor: string;
  staffColor: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export default function ScheduleCard({
  title,
  timeLabel,
  staff,
  tag,
  tagColor,
  bgColor,
  borderColor,
  staffColor,
  style,
  onClick,
}: ScheduleCardProps) {
  return (
    <Box
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="md"
      pt="10px"
      pb="10px"
      px="10px"
      overflow="hidden"
      cursor="pointer"
      transition="box-shadow 0.15s"
      _hover={{ boxShadow: "0 2px 8px var(--colors-card-hover-shadow)" }}
      zIndex={2}
      minH="24px"
      style={style}
      onClick={onClick}
    >
      <Flex align="center" gap="8px" mb="4px">
        <Flex
          w="28px"
          h="28px"
          borderRadius="50%"
          bg="white"
          align="center"
          justify="center"
          flexShrink={0}
          style={{ border: `1.5px solid var(--colors-${borderColor})` }}
        >
          <Text fontSize="10px" fontWeight="700" color="textMuted">
            {tag}
          </Text>
        </Flex>
      </Flex>

      <Text fontSize="sm" fontWeight="600" color="textPrimary" lineHeight="1.3">
        {title}
      </Text>

      <Text fontSize="xs" color="textMuted" mt="2px">
        {timeLabel}
      </Text>

      {staff && (
        <Text fontSize="xs" color={staffColor} mt="2px">
          {staff}
        </Text>
      )}
    </Box>
  );
}
