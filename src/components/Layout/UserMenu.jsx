import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Text,
  UnstyledButton,
  Avatar,
  Flex,
  Menu,
  Badge,
  Container,
  createStyles,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { BsChevronDown } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";

import { logoutUser } from "../../features/user/userSlice";
import { removeMyProfile } from "../../features/profile/profileSlice";

const useStyles = createStyles((theme) => ({
  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 200ms ease",

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
}));

const UserMenu = () => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { myProfile } = useSelector((state) => state.profile);
  const { classes, theme, cx } = useStyles();
  const dispatch = useDispatch();

  const logoutUserHandler = () => {
    dispatch(logoutUser());
    dispatch(removeMyProfile());
  };

  return (
    <Container className={classes.mainSection}>
      <Menu
        radius="xs"
        width={200}
        position="bottom-end"
        transition="pop-top-right"
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
      >
        <Menu.Target>
          <UnstyledButton
            radius="xs"
            className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
            px={10}
            py={6}
          >
            <Flex spacing={7} align="center">
              <Avatar
                src={import.meta.env.VITE_BASE_IMAGE_URL + myProfile?.photo}
                alt={myProfile?.name}
                radius="xl"
                size={26}
              />
              <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mx={10}>
                {myProfile?.name}
              </Text>
              <BsChevronDown size={12} />
            </Flex>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Badge radius="xs" sx={{ width: "100%" }}>
            {myProfile?.role}
          </Badge>
          <Menu.Label>Account</Menu.Label>

          <Menu.Item component={Link} to="/my-profile" icon={<IoSettingsOutline size={18} />}>
            Profile
          </Menu.Item>
          <Menu.Item component={Link} to="/apply-expert" icon={<CiLocationArrow1 size={18} />}>
            Apply for Expert
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Actions</Menu.Label>

          {myProfile?.role === "admin" && (
            <Menu.Item
              component={Link}
              to="/admin"
              icon={<MdOutlineAdminPanelSettings size={18} />}
            >
              Admin Panel
            </Menu.Item>
          )}
          <Menu.Item onClick={logoutUserHandler} color="red" icon={<IoLogOutOutline size={18} />}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Container>
  );
};

export default UserMenu;
