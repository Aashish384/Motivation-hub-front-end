import React from "react";
import { Link } from "react-router-dom";
import { Text, useMantineTheme, Menu, Divider, Badge } from "@mantine/core";
import { IoEllipsisHorizontal, IoLogOutOutline, IoPersonOutline } from "react-icons/io5";
import { CiLocationArrow1 } from "react-icons/ci";

const menus = [
  {
    name: "Profile",
    icon: <IoPersonOutline size={15} />,
    to: "/my-profile",
  },
];

const UserInfoMenu = (props) => {
  const theme = useMantineTheme();

  return (
    <Menu sx={{ marginLeft: "auto" }} width={200}>
      <Menu.Target>
        <Text sx={{ color: theme.colors.primary[6] }}>
          <IoEllipsisHorizontal size={18} />
        </Text>
      </Menu.Target>
      <Menu.Dropdown>
        <Badge sx={{ width: "100%" }} radius="sm" mb={8}>
          {props.myProfile.role}
        </Badge>
        {menus.map((menu) => (
          <Menu.Item component={Link} to={menu.to} key={menu.name} icon={menu.icon}>
            {menu.name}
          </Menu.Item>
        ))}
        {props.myProfile.role !== "expert" && (
          <Menu.Item component={Link} to={"/apply-expert"} icon={<CiLocationArrow1 size={15} />}>
            Apply for Expert
          </Menu.Item>
        )}

        <Divider />
        <Menu.Label>Actions</Menu.Label>

        <Menu.Item
          color="red"
          icon={<IoLogOutOutline size={16} />}
          onClick={props.logoutUserHandler}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserInfoMenu;
