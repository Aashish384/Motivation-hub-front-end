import { useState } from "react";
import {
  createStyles,
  Navbar,
  ActionIcon,
  ScrollArea,
  Button,
  getStylesRef,
  rem,
} from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MdOutlineExplore } from "react-icons/md";

import UserInfo from "./UserInfo";

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.xs,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
      },
    },
  },
}));

const data = [
  { link: "/explore", label: "Explore" },
  { link: "/groups", label: "Groups" },
  { link: "/challenges", label: "Challenges" },
  { link: "/admin", label: "Admin" },
  { link: "/chat", label: "Chat" },
];

export default function SideNav() {
  const location = useLocation();
  const { classes, cx, theme } = useStyles();
  const [active, setActive] = useState("");

  const { isAuthenticated } = useSelector((state) => state.user);
  const { myProfileLoading, myProfile } = useSelector((state) => state.profile);

  useEffect(() => {
    if (location.pathname.includes("/explore")) {
      setActive("Explore");
    } else if (location.pathname.includes("/chat")) {
      setActive("Chat");
    } else if (location.pathname.includes("/groups")) {
      setActive("Groups");
    } else if (location.pathname.includes("/challenges")) {
      setActive("Challenges");
    } else if (location.pathname.includes("/admin")) {
      setActive("Admin");
    }
  }, []);

  const links = data.map((item) => (
    <Link
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <span>{item.label}</span>
    </Link>
  ));

  return (
    // <Navbar height={730} width={{ sm: 300 }} p="md">
    <>
      {/* <Navbar.Section>
        <Group className={classes.header} position="apart">
          <Flex gap={8} align="center">

            <Text weight={700} size="lg" color="primary">
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
            </Text>
          </Flex>
        </Group>
      </Navbar.Section> */}

      <Navbar.Section grow component={ScrollArea}>
        {/* {links} */}
        <Link
          className={cx(classes.link, { [classes.linkActive]: "Explore" === active })}
          to={"/explore"}
          onClick={() => {
            setActive("Explore");
          }}
        >
          <span>Explore</span>
        </Link>
        <Link
          className={cx(classes.link, { [classes.linkActive]: "Groups" === active })}
          to={"/groups"}
          onClick={() => {
            setActive("Groups");
          }}
        >
          <span>Groups</span>
        </Link>
        <Link
          className={cx(classes.link, { [classes.linkActive]: "Challenges" === active })}
          to={"/challenges"}
          onClick={() => {
            setActive("Challenges");
          }}
        >
          <span>Challenges</span>
        </Link>
        {!myProfileLoading && myProfile && myProfile.role === "admin" && (
          <Link
            className={cx(classes.link, { [classes.linkActive]: "Admin" === active })}
            to={"/admin"}
            onClick={() => {
              setActive("Admin");
            }}
          >
            <span>Admin</span>
          </Link>
        )}

        <Link
          className={cx(classes.link, { [classes.linkActive]: "Chat" === active })}
          to={"/chat"}
          onClick={() => {
            setActive("Chat");
          }}
        >
          <span>Chat</span>
        </Link>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        {isAuthenticated && myProfile ? (
          <UserInfo />
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
      </Navbar.Section>
    </>
    // </Navbar>
  );
}
