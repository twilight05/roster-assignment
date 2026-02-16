"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { Category, Setting2, Notification } from "iconsax-reactjs";
import { LuChevronDown } from "react-icons/lu";

export default function Navbar() {
  return (
    <Flex
      w="100%"
      h="100px"
      bg="white"
      borderBottom="1px solid"
      borderColor="borderDefault"
      alignItems="center"
      justifyContent="flex-end"
      py="24px"
      pr="24px"
      pl="40px"
    >
      <Flex alignItems="center" gap="24px">
        <Box
          cursor="pointer"
          _hover={{ opacity: 0.7 }}
          transition="opacity 0.15s"
        >
          <Category size={22} color="#009FE3" variant="Linear" />
        </Box>
        <Box
          cursor="pointer"
          _hover={{ opacity: 0.7 }}
          transition="opacity 0.15s"
        >
          <Setting2 size={22} color="#3C4858" variant="Linear" />
        </Box>
        <Box
          cursor="pointer"
          _hover={{ opacity: 0.7 }}
          transition="opacity 0.15s"
          position="relative"
        >
          <Notification size={22} color="#3C4858" variant="Linear" />
          <Box
            position="absolute"
            top="-2px"
            right="-2px"
            w="8px"
            h="8px"
            borderRadius="50%"
            bg="liveChip"
            border="2px solid"
            borderColor="white"
          />
        </Box>

        <Flex
          alignItems="center"
          gap="8px"
          cursor="p
        ointer"
        >
          <Box>
            <Text
              fontFamily="body"
              fontSize="md"
              fontWeight="600"
              lineHeight="19px"
              letterSpacing="0.2px"
              color="textPrimary"
            >
              Paul Cornelius
            </Text>
            <Text
              fontFamily="body"
              fontSize="sm"
              fontWeight="400"
              lineHeight="19px"
              letterSpacing="0.2px"
              color="textMuted"
            >
              Paul@district.com
            </Text>
          </Box>
          <LuChevronDown size={16} color="#8492A6" />
        </Flex>
      </Flex>
    </Flex>
  );
}
