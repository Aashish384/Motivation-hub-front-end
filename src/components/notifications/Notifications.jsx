import React, { useEffect } from "react";
import {
  Menu,
  Loader,
  ActionIcon,
  ScrollArea,
  Flex,
  Badge,
  Box,
  Indicator,
  Button,
} from "@mantine/core";
import { IoNotificationsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";
import { getUserNotifications, readUserNotifications } from "../../features/user/userSlice";

const Notifications = (props) => {
  const dispatch = useDispatch();
  const { notifications, notificationsLoading } = useSelector((state) => state.user);

  // let SECONDS_MS = 4000;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     dispatch(getUserNotifications());
  //   }, SECONDS_MS);

  //   return () => clearInterval(interval);
  // }, []);

  const readNotificationsHandler = () => {
    dispatch(readUserNotifications());
  };

  let renderNotifications = <></>;

  if (notificationsLoading || !notifications) {
    renderNotifications = <></>;
  } else if (notifications && notifications.length >= 0) {
    renderNotifications = notifications.map((notification) => (
      <Menu.Item sx={{ padding: 0 }} key={notification._id}>
        <NotificationItem notification={notification} />
      </Menu.Item>
    ));
  }

  return (
    <Menu
      placement="end"
      width={400}
      // px={10}
      styles={(theme) => ({ itemLabel: { flex: 1 } })}
    >
      <Menu.Target>
        <ActionIcon variant="hover" size={22} color="primary">
          <Indicator
            inline
            label={notifications?.filter((el) => el.read === false).length}
            size={14}
          >
            <IoNotificationsOutline size={20} />
          </Indicator>
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <ScrollArea style={{ height: 350 }} scrollbarSize={5}>
          <Menu.Label
            pl={0}
            sx={(theme) => ({
              fontSize: 16,
              color: theme.colors.primary[6],
            })}
          >
            <Flex justify="space-between" align="center">
              <span>
                Notifications
                {/* <Badge size="sm" radius="sm" ml={8}>
                  {notifications?.length}
                </Badge> */}
              </span>
              <Button size="xs" variant="subtle" color="green" onClick={readNotificationsHandler}>
                Read All
              </Button>
            </Flex>
          </Menu.Label>
          <Flex direction="column" gap={12} mt={12}>
            {renderNotifications}
          </Flex>
        </ScrollArea>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Notifications;
