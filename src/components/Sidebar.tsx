"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { HamburgerMenu } from "iconsax-reactjs";
import { useState } from "react";
import { navItems } from "@/navigation";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(() => navItems[0].label);
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
        {navItems.map((item) => {
          if (item.children) {
            return (
              <SidebarItem
                key={item.label}
                item={item}
                defaultExpanded={item.label === activeTab}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            );
          }
          const isActive = activeTab === item.label;
          return (
            <Flex
              key={item.label}
              align="center"
              px="20px"
              py="10px"
              cursor="pointer"
              _hover={{ bg: "surface" }}
              bg={isActive ? "sidebarActiveBg" : "transparent"}
              gap="12px"
              mb="2px"
              transition="background 0.15s"
              onClick={() => setActiveTab(item.label)}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={20}
                height={20}
                style={{
                  filter: isActive
                    ? "invert(27%) sepia(81%) saturate(749%) hue-rotate(221deg) brightness(92%) contrast(92%)"
                    : "none",
                }}
              />
              <Text
                fontFamily="body"
                fontSize="lg"
                color={isActive ? "sidebarAccent" : "sidebarText"}
                fontWeight="700"
                lineHeight="100%"
              >
                {item.label}
              </Text>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
};

export default Sidebar;
