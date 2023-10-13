import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Image,
  Flex,
  Group,
  Burger,
  useMantineTheme,
  Box,
} from "@mantine/core";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import TopNav from "./TopNav";
import Register from "../auth/Register";
import Login from "../auth/Login";
import ResetPassword from "../auth/ResetPassword/ResetPassword";
import NewPassword from "../auth/ResetPassword/NewPassword";
import SideNav from "./SideNav";
import Layout from "./Layout";
import Home from "../Home/Home";
import ToggleTheme from "../common/ToggleTheme";
import Notifications from "../notifications/Notifications";

export default function AppSkeleton(props) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.user);

  if (location.pathname === "/" || !isAuthenticated) {
    return (
      <div>
        <TopNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/new-password/:passwordResetString" element={<NewPassword />} />
        </Routes>
      </div>
    );
  }

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 180, lg: 180 }}>
          <SideNav />
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 60 }} p="md">
          <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Group position="apart" sx={{ width: "100%" }}>
              <Flex gap={8} align="center">
                <Box component={Link} to="/">
                  <Image src={"/logonew.PNG"} height={60} />
                </Box>
                {/* <Text weight={700} size="lg" color="primary">
                  Motivational
                  <Badge
                    radius="xs"
                    ml={4}
                    color="red"
                    variant="filled"
                    sx={{ textTransform: "capitalize" }}
                  >
                    Hub
                  </Badge>
                </Text> */}
              </Flex>
              <Flex mr={36} align="center" gap={20}>
                <ToggleTheme toggleColorScheme={props.toggleColorScheme} />
                <Notifications />
              </Flex>
            </Group>
          </div>
        </Header>
      }
    >
      <Layout />
    </AppShell>
  );
}
