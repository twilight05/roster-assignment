"use client";

import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Category, Setting2, Notification } from "iconsax-reactjs";

export default function Navbar() {
  return (
    <Flex
      w="100%"
      h="100px"
      bg="#FFFFFF"
      borderBottom="1px solid #D9E5F2"
      alignItems="center"
      justifyContent="space-between"
      py="24px"
      pr="24px"
      pl="40px"
    >
      {/* Left — Icon actions */}
      <Flex gap="24px" alignItems="center">
        <Box cursor="pointer" _hover={{ opacity: 0.7 }} transition="opacity 0.15s">
          <Category size={22} color="#3C4858" variant="Linear" />
        </Box>
        <Box cursor="pointer" _hover={{ opacity: 0.7 }} transition="opacity 0.15s">
          <Setting2 size={22} color="#3C4858" variant="Linear" />
        </Box>
        <Box cursor="pointer" _hover={{ opacity: 0.7 }} transition="opacity 0.15s" position="relative">
          <Notification size={22} color="#3C4858" variant="Linear" />
          {/* Notification dot */}
          <Box
            position="absolute"
            top="-2px"
            right="-2px"
            w="8px"
            h="8px"
            borderRadius="50%"
            bg="#FF4D4F"
            border="2px solid #FFFFFF"
          />
        </Box>
      </Flex>

      {/* Right — User info */}
      <Flex alignItems="center" gap="12px">
        <Box
          w="42px"
          h="42px"
          borderRadius="50%"
          bg="#EDE9FE"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <Text fontSize="14px" fontWeight="700" color="#6D5BD0">
            PC
          </Text>
        </Box>
        <Box>
          <Text fontSize="14px" fontWeight="600" color="#1A1A2E">
            Paul Cornelius
          </Text>
          <Text fontSize="12px" color="#8492A6" fontWeight="400">
            Paul@district.com
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
