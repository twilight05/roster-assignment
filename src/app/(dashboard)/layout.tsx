import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex minH="100vh">
      <Sidebar />
      <Flex direction="column" flex="1" ml="260px" bg="#FAFBFC">
        <Navbar />
        <Box flex="1">{children}</Box>
      </Flex>
    </Flex>
  );
}
