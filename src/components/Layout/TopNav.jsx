import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Text,
  Burger,
  Drawer,
  ScrollArea,
  Flex,
  Container,
  Image,
  Anchor,
  ActionIcon,
  Badge,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { SiTwoo } from "react-icons/si";

import UserMenu from "./UserMenu";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none !important",
    // color: theme.black,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontWeight: 500,
    fontSize: theme.fontSizes.md,
    borderRadius: 1,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      // backgroundColor: theme.colors.gray[1],
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const TopNav = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <Box>
      <Header py={10} px="md">
        <Container size="lg">
          <Group position="apart" sx={{ height: "100%" }}>
            <Flex gap={8} align="center">
              {/* <ActionIcon component={Link} to="/">
                <SiTwoo size={26} color={theme.colors.primary[6]} style={{ cursor: "pointer" }} />
              </ActionIcon> */}
              <Box component={Link} to="/">
                <Image src={"/logonew.PNG"} height={60} />
              </Box>

              {/* <Text weight={700} size="lg" color="primary">
                Motivational{" "}
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

            <Group
              sx={{ height: "100%", flex: 1, justifyContent: "center" }}
              spacing={20}
              className={classes.hiddenMobile}
              align="center"
            >
              {isAuthenticated ? (
                <>
                  <Anchor className={classes.link} component={Link} to="/" py={4}>
                    <Text ml={6}>Home</Text>
                  </Anchor>
                  <Anchor className={classes.link} component={Link} to="/explore" py={4}>
                    <Text ml={6}>Explore</Text>
                  </Anchor>
                  <Anchor className={classes.link} component={Link} to="/groups" py={4}>
                    <Text ml={6}>Groups</Text>
                  </Anchor>
                  <Anchor className={classes.link} component={Link} to="/challenges" py={4}>
                    <Text ml={6}>Challenges</Text>
                  </Anchor>

                  <Anchor className={classes.link} component={Link} to="/chat" py={4}>
                    <Text ml={6}>Chat</Text>
                  </Anchor>
                </>
              ) : null}
            </Group>

            <Group className={classes.hiddenMobile}>
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <Flex gap={16}>
                  <Button radius="xs" variant="default" component={Link} to="/login">
                    Log in
                  </Button>
                  <Button radius="xs" component={Link} to="/register">
                    Sign up
                  </Button>
                </Flex>
              )}
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          </Group>
        </Container>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={
          <ActionIcon component={Link} to="/">
            {/* <SiTwoo size={26} color={theme.fn.primaryColor()} style={{ cursor: "pointer" }} /> */}
            <Link to="/">
              <Image src={"/logo2.jpg"} height={60} />
            </Link>
          </ActionIcon>
        }
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider my="sm" color={"gray.1"} />
          {isAuthenticated ? (
            <>
              <Anchor className={classes.link} component={Link} to="/" py={4}>
                Home
              </Anchor>
              <Anchor className={classes.link} component={Link} to="/groups" py={4}>
                Groups
              </Anchor>
              <Anchor className={classes.link} component={Link} to="/challenges" py={4}>
                Challenges
              </Anchor>

              <Anchor className={classes.link} component={Link} to="/chat" py={4}>
                Chat
              </Anchor>
            </>
          ) : null}

          <Divider my="sm" color={"gray.1"} />

          <Group position="center" pb="xl" px="md">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <Button radius="xs" variant="default" component={Link} to="/login">
                  Log in
                </Button>
                <Button radius="xs" component={Link} to="/register">
                  Sign up
                </Button>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default TopNav;
