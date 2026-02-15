"use client";

import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HamburgerMenu } from "iconsax-reactjs";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";

interface NavChild {
  label: string;
  href: string;
  icon: string;
}

interface NavItem {
  label: string;
  icon: string;
  href?: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { label: "Startpagina", icon: "/assets/Startpagina.svg", href: "/" },
  {
    label: "Rooster",
    icon: "/assets/Rooster.svg",
    children: [
      { label: "Mijn Rooster", href: "/mijn-rooster", icon: "/assets/Mijn.svg" },
      { label: "Planner", href: "/planner", icon: "/assets/Planner.svg" },
      { label: "Instellingen", href: "/instellingen", icon: "/assets/Planner.svg" },
    ],
  },
  { label: "My to do Protocols", icon: "/assets/Planner.svg", href: "/protocols" },
  { label: "Document Management", icon: "/assets/document.svg", href: "/documents" },
  { label: "Department News", icon: "/assets/department.svg", href: "/department-news" },
  { label: "Knowledge Base", icon: "/assets/knowledge.svg", href: "/knowledge-base" },
  { label: "General News", icon: "/assets/generalnews.svg", href: "/general-news" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Rooster"]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href;

  return (
    <Box
      as="aside"
      w="260px"
      minH="100vh"
      bg="#FFFFFF"
      borderRight="1px solid #D9E5F2"
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
          src="/assets/Group 2085660774.svg"
          alt="Excellent Care Clinics"
          width={130}
          height={32}
          priority
        />
        <Box cursor="pointer" flexShrink={0} color="#8492A6">
          <HamburgerMenu size={20} />
        </Box>
      </Flex>

      <Box flex="1" py="12px">
        {navItems.map((item) => {
          const isExpanded = expandedItems.includes(item.label);

          if (item.children) {
            return (
              <Box key={item.label} mb="2px">
                <Flex
                  align="center"
                  px="20px"
                  py="10px"
                  cursor="pointer"
                  _hover={{ bg: "#F7F9FC" }}
                  onClick={() => toggleExpand(item.label)}
                  gap="12px"
                  transition="background 0.15s"
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                  />
                  <Text
                    flex="1"
                    fontFamily="'Manrope', sans-serif"
                    fontSize="16px"
                    color={isExpanded ? "#242424" : "#4E5D69"}
                    fontWeight="700"
                    lineHeight="100%"
                  >
                    {item.label}
                  </Text>
                  {isExpanded ? (
                    <LuChevronDown size={16} color="#8492A6" />
                  ) : (
                    <LuChevronRight size={16} color="#8492A6" />
                  )}
                </Flex>
                {isExpanded && (
                  <Box pl="32px" mt="2px">
                    {item.children.map((child) => {
                      const active = isActive(child.href);
                      return (
                        <Link
                          key={child.label}
                          href={child.href}
                          style={{ textDecoration: "none" }}
                        >
                          <Flex
                            align="center"
                            py="8px"
                            px="20px"
                            gap="10px"
                            cursor="pointer"
                            borderRadius="6px"
                            bg={active ? "#F0F0FF" : "transparent"}
                            _hover={{ bg: active ? "#F0F0FF" : "#F7F9FC" }}
                            transition="background 0.15s"
                            position="relative"
                          >
                            {active && (
                              <Box
                                position="absolute"
                                left="8px"
                                w="3px"
                                h="18px"
                                borderRadius="2px"
                                bg="#4F46E5"
                              />
                            )}
                            <Image
                              src={child.icon}
                              alt={child.label}
                              width={20}
                              height={20}
                            />
                            <Text
                              fontFamily="'Manrope', sans-serif"
                              fontSize="16px"
                              color={active ? "#4F46E5" : "#4E5D69"}
                              fontWeight="700"
                              lineHeight="100%"
                            >
                              {child.label}
                            </Text>
                          </Flex>
                        </Link>
                      );
                    })}
                  </Box>
                )}
              </Box>
            );
          }

          const active = isActive(item.href!);
          return (
            <Link
              key={item.label}
              href={item.href!}
              style={{ textDecoration: "none" }}
            >
              <Flex
                align="center"
                px="20px"
                py="10px"
                cursor="pointer"
                _hover={{ bg: "#F7F9FC" }}
                bg={active ? "#F0F0FF" : "transparent"}
                gap="12px"
                mb="2px"
                transition="background 0.15s"
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={20}
                  height={20}
                />
                <Text
                  fontFamily="'Manrope', sans-serif"
                  fontSize="16px"
                  color={active ? "#4F46E5" : "#4E5D69"}
                  fontWeight="700"
                  lineHeight="100%"
                >
                  {item.label}
                </Text>
              </Flex>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}
