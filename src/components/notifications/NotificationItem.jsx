import React from "react";
import { Link } from "react-router-dom";
import { Notification, Text, ActionIcon, Flex } from "@mantine/core";
import { IoGlassesOutline, IoAlertOutline } from "react-icons/io5";
import { BsArrowUpRight } from "react-icons/bs";

const NotificationItem = (props) => {
  if (props.notification.type === "challenge") {
    return (
      <Notification
        icon={<IoAlertOutline size={12} />}
        withCloseButton={false}
        sx={(theme) => ({
          // backgroundColor: theme.colors.gray[1],
          border: `1px solid ${theme.colors.gray[3]}`,
          boxShadow: "none",
          transition: "all .3s",
          "&:hover": {
            // backgroundColor: theme.colors.gray[3],
            opacity: "90%",
          },
        })}
      >
        <Flex>
          <Text
            size="sm"
            color={props.notification.read ? "dimmed" : null}
            sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}
          >
            <span>{props.notification.text}</span>

            <ActionIcon component={Link} to={`/challenges`} ml={-4}>
              <BsArrowUpRight size={14} />
            </ActionIcon>
          </Text>
        </Flex>
      </Notification>
    );
  } else if (props.notification.type === "group") {
    return (
      <Notification
        icon={<IoAlertOutline size={12} />}
        withCloseButton={false}
        sx={(theme) => ({
          // backgroundColor: theme.colors.gray[1],
          border: `1px solid ${theme.colors.gray[3]}`,
          boxShadow: "none",
          transition: "all .3s",
          "&:hover": {
            opacity: "90%",
            // backgroundColor: theme.colors.gray[3],
          },
        })}
      >
        <Flex>
          <Text
            size="sm"
            color={props.notification.read ? "dimmed" : null}
            sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}
          >
            <span>{props.notification.text}</span>

            <ActionIcon component={Link} to={`/groups`} ml={-4}>
              <BsArrowUpRight size={14} />
            </ActionIcon>
          </Text>
        </Flex>
      </Notification>
    );
  } else if (props.notification.type === "user-reported") {
    return (
      <Notification
        icon={<IoAlertOutline size={12} />}
        withCloseButton={false}
        sx={(theme) => ({
          // backgroundColor: theme.colors.gray[1],
          border: `1px solid ${theme.colors.gray[3]}`,
          boxShadow: "none",
          transition: "all .3s",
          "&:hover": {
            opacity: "90%",
            // backgroundColor: theme.colors.gray[3],
          },
        })}
      >
        <Flex>
          <Text
            size="sm"
            color={props.notification.read ? "dimmed" : null}
            sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}
          >
            <span>{props.notification.text}</span>

            <ActionIcon component={Link} to={`/admin`} ml={-4}>
              <BsArrowUpRight size={14} />
            </ActionIcon>
          </Text>
        </Flex>
      </Notification>
    );
  } else if (
    props.notification.type === "friend-request" ||
    props.notification.type === "friend-request-accepted"
  ) {
    return (
      <Notification
        icon={<IoAlertOutline size={12} />}
        withCloseButton={false}
        sx={(theme) => ({
          // backgroundColor: theme.colors.gray[1],
          border: `1px solid ${theme.colors.gray[3]}`,
          boxShadow: "none",
          transition: "all .3s",
          "&:hover": {
            opacity: "90%",
            // backgroundColor: theme.colors.gray[3],
          },
        })}
      >
        <Flex>
          <Text
            size="sm"
            color={props.notification.read ? "dimmed" : null}
            sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}
          >
            <span>{props.notification.text}</span>

            <ActionIcon component={Link} to={`/my-profile`} ml={-4}>
              <BsArrowUpRight size={14} />
            </ActionIcon>
          </Text>
        </Flex>
      </Notification>
    );
  } else {
    return (
      <Notification
        icon={<IoAlertOutline size={12} />}
        withCloseButton={false}
        sx={(theme) => ({
          // backgroundColor: theme.colors.gray[1],
          border: `1px solid ${theme.colors.gray[3]}`,
          boxShadow: "none",
          transition: "all .3s",
          "&:hover": {
            // backgroundColor: theme.colors.gray[3],
          },
        })}
      >
        <Text
          size="sm"
          color={props.notification.read ? "dimmed" : null}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{props.notification.text}</span>
        </Text>
      </Notification>
    );
  }
};

export default NotificationItem;
