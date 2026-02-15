"use client";

import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar1,
  ClipboardText,
  Folder2,
  DocumentText,
  Book,
  Note,
  Setting2,
  HamburgerMenu,
} from "iconsax-reactjs";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { label: "Startpagina", icon: Home, href: "/" },
  {
    label: "Rooster",
    icon: Calendar1,
    children: [
      { label: "Mijn Rooster", href: "/mijn-rooster" },
      { label: "Planner", href: "/planner" },
      { label: "Instellingen", href: "/instellingen" },
    ],
  },
  { label: "My to do Protocols", icon: ClipboardText, href: "/protocols" },
  { label: "Document Management", icon: Folder2, href: "/documents" },
  { label: "Department News", icon: DocumentText, href: "/department-news" },
  { label: "Knowledge Base", icon: Book, href: "/knowledge-base" },
  { label: "General News", icon: Note, href: "/general-news" },
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
      {/* Logo */}
      <Flex
        align="center"
        px="20px"
        py="20px"
        gap="12px"
        borderBottom="1px solid #F0F4F8"
      >
        <Box
          w="40px"
          h="40px"
          borderRadius="50%"
          bg="linear-gradient(135deg, #7B6FE8, #A78BFA)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <Text color="white" fontWeight="700" fontSize="18px">
            C
          </Text>
        </Box>
        <Box flex="1" minW={0}>
          <Text
            fontSize="12px"
            fontWeight="700"
            color="#1A1A2E"
            lineHeight="1.3"
          >
            excellent care
          </Text>
          <Text fontSize="11px" fontWeight="400" color="#8492A6" lineHeight="1.3">
            clinics
          </Text>
        </Box>
        <Box cursor="pointer" flexShrink={0} color="#8492A6">
          <HamburgerMenu size={20} />
        </Box>
      </Flex>

      {/* Navigation */}
      <Box flex="1" py="12px">
        {navItems.map((item) => {
          const Icon = item.icon;
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
                  <Icon size={20} color="#8492A6" variant="Linear" />
                  <Text
                    flex="1"
                    fontSize="14px"
                    color="#3C4858"
                    fontWeight="500"
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
                                w="4px"
                                h="4px"
                                borderRadius="50%"
                                bg="#4F46E5"
                              />
                            )}
                            <Text
                              fontSize="14px"
                              color={active ? "#4F46E5" : "#8492A6"}
                              fontWeight={active ? "600" : "400"}
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
                <Icon
                  size={20}
                  color={active ? "#4F46E5" : "#8492A6"}
                  variant="Linear"
                />
                <Text
                  fontSize="14px"
                  color={active ? "#4F46E5" : "#3C4858"}
                  fontWeight={active ? "600" : "500"}
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
