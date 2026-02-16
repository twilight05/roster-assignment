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
  style?: CSSProperties;
}

export default function ScheduleCard({
  title,
  timeLabel,
  staff,
  tag,
  tagColor,
  bgColor,
  borderColor,
  style,
}: ScheduleCardProps) {
  return (
    <Box
      bg={bgColor}
      border={`1px solid ${borderColor}`}
      borderLeft={`3px solid ${borderColor}`}
      borderRadius="sm"
      pt="10px"
      pb="10px"
      px="8px"
      overflow="hidden"
      cursor="pointer"
      transition="box-shadow 0.15s"
      _hover={{ boxShadow: "0 2px 8px var(--colors-card-hover-shadow)" }}
      zIndex={2}
      minH="24px"
      style={style}
    >
      <Flex align="center" gap="8px" mb="4px">
        <Box px="6px" py="2px" borderRadius="4px" bg={tagColor} flexShrink={0}>
          <Text fontSize="10px" fontWeight="700" color="white">
            {tag}
          </Text>
        </Box>
      </Flex>

      <Text fontSize="sm" fontWeight="600" color="textPrimary" lineHeight="1.3">
        {title}
      </Text>

      <Text fontSize="xs" color="textMuted" mt="2px">
        {timeLabel}
      </Text>

      {staff && (
        <Text fontSize="xs" color="staffLink" mt="2px">
          {staff}
        </Text>
      )}
    </Box>
  );
}
