import { Card, Title, Text, Badge, Flex, Button, Divider, Avatar, Image, Box } from "@mantine/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import GroupMembers from "./GroupMembers";
import AddMember from "./AddMember";
import axiosInstance from "../../utils/axiosInstance";

const Group = ({ group, user, userRole }) => {
  const [opened, setOpened] = useState(false);
  const [addMemberOpened, setAddMemberOpened] = useState(false);

  const deleteGroupHandler = async (id) => {
    try {
      await axiosInstance.delete(`/group/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card withBorder shadow="md" mb={8} radius="xs">
      <AddMember opened={addMemberOpened} setOpened={setAddMemberOpened} groupId={group._id} />
      <GroupMembers opened={opened} setOpened={setOpened} members={group.members || []} />
      <Image
        src={import.meta.env.VITE_BASE_IMAGE_URL + group.image}
        height={100}
        width={200}
        sx={{ margin: "auto" }}
        radius="xs"
      />
      <Divider my={12} />
      <Flex justify="space-between">
        <Title order={4}>{group.title}</Title>
        {(userRole === "expert" || userRole === "admin") && (
          <Button
            radius={"xs"}
            variant="subtle"
            size="xs"
            ml="auto"
            color="red"
            onClick={() => deleteGroupHandler(group._id)}
          >
            Delete
          </Button>
        )}
      </Flex>
      <Text size="sm" align="justify">
        {group.description}
      </Text>
      <Divider my={12} />

      <Flex gap={8} mt={10} align="center">
        <Badge size="lg" radius="xs">
          {group.members.length || 0}
        </Badge>
        <Text weight={600}>Members</Text>
      </Flex>
      <Flex gap={12} align="center" mt={12}>
        {group.members?.length > 0 &&
          group.members
            .slice(0, 6)
            .map((el) => (
              <Avatar
                key={el._id}
                radius="xl"
                src={import.meta.env.VITE_BASE_IMAGE_URL + el.user.photo}
              />
            ))}
      </Flex>
      <Flex justify="space-between" mt={12}>
        <Button size="xs" variant="outline" radius="xs" onClick={() => setOpened(true)}>
          View Members
        </Button>
        {(userRole === "expert" || userRole === "admin") && (
          <Button size="xs" variant="outline" radius="xs" onClick={() => setAddMemberOpened(true)}>
            Add Member
          </Button>
        )}
      </Flex>
      <Card withBorder p="xs" mt={16} radius="xs">
        <Text size="sm" weight={600}>
          Created By
        </Text>
        <Flex mt={8} align="center" gap={12}>
          <Avatar
            radius="xl"
            src={import.meta.env.VITE_BASE_IMAGE_URL + group.createdBy.photo}
            component={Link}
            to={`/user-profile/${group.createdBy._id}`}
          />
          <Box>
            <Text size="sm" component={Link} to={`/user-profile/${group.createdBy._id}`}>
              {group.createdBy.name}
            </Text>
            <Text color="dimmed" size="xs">
              {group.createdBy.email}
            </Text>
          </Box>
        </Flex>
      </Card>
    </Card>
  );
};

export default Group;
