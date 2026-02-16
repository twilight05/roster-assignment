"use client";

import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { HamburgerMenu } from "iconsax-reactjs";
import { navItems } from "@/navigation";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <Box
      as="aside"
      w="260px"
      minH="100vh"
      bg="white"
      borderRight="1px solid"
      borderColor="borderDefault"
      position="fixed"
      left={0}
      top={0}
      zIndex={10}
      display="flex"
      flexDirection="column"
      overflowY="auto"
    >
      <Flex
        align="center"
        w="228px"
        h="39px"
        justifyContent="space-between"
        mt="24px"
        ml="21px"
        mb="16px"
      >
        <Image
          src="/assets/logo.svg"
          alt="Excellent Care Clinics"
          width={130}
          height={32}
          priority
        />
        <Box cursor="pointer" flexShrink={0} color="textMuted">
          <HamburgerMenu size={20} />
        </Box>
      </Flex>

      <Box flex="1" py="12px">
        {navItems.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
            defaultExpanded={item.label === "Rooster"}
          />
        ))}
      </Box>
    </Box>
  );
}
