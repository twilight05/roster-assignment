"use client";

import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import type { NavItem } from "@/navigation";

interface Props {
  item: NavItem;
  defaultExpanded?: boolean;
}

export default function SidebarItem({ item, defaultExpanded = false }: Props) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (item.children) {
    return (
      <Box mb="2px">
        <Flex
          align="center"
          px="20px"
          py="10px"
          cursor="pointer"
          _hover={{ bg: "surface" }}
          onClick={() => setExpanded((v) => !v)}
          gap="12px"
          transition="background 0.15s"
        >
          <Image src={item.icon} alt={item.label} width={20} height={20} />
          <Text
            flex="1"
            fontFamily="body"
            fontSize="lg"
            color={expanded ? "textPrimary" : "sidebarText"}
            fontWeight="700"
            lineHeight="100%"
          >
            {item.label}
          </Text>
          {expanded ? (
            <LuChevronDown size={16} color="#8492A6" />
          ) : (
            <LuChevronRight size={16} color="#8492A6" />
          )}
        </Flex>

        {expanded && (
          <Box pl="32px" mt="2px">
            {item.children.map((child) => {
              const active = pathname === child.href;
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
                    borderRadius="xs"
                    bg={active ? "sidebarActiveBg" : "transparent"}
                    _hover={{ bg: active ? "sidebarActiveBg" : "surface" }}
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
                        bg="sidebarAccent"
                      />
                    )}
                    <Image
                      src={child.icon}
                      alt={child.label}
                      width={20}
                      height={20}
                    />
                    <Text
                      fontFamily="body"
                      fontSize="lg"
                      color={active ? "sidebarAccent" : "sidebarText"}
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

  const active = pathname === item.href;
  return (
    <Link href={item.href!} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        px="20px"
        py="10px"
        cursor="pointer"
        _hover={{ bg: "surface" }}
        bg={active ? "sidebarActiveBg" : "transparent"}
        gap="12px"
        mb="2px"
        transition="background 0.15s"
      >
        <Image src={item.icon} alt={item.label} width={20} height={20} />
        <Text
          fontFamily="body"
          fontSize="lg"
          color={active ? "sidebarAccent" : "sidebarText"}
          fontWeight="700"
          lineHeight="100%"
        >
          {item.label}
        </Text>
      </Flex>
    </Link>
  );
}
