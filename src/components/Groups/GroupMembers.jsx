import { Modal, Flex, Card, Text, Avatar } from "@mantine/core";
import { Link } from "react-router-dom";

const GroupMembers = (props) => {
  return (
    <Modal
      radius="xs"
      title="Group members"
      centered
      size="xs"
      opened={props.opened}
      onClose={() => props.setOpened(false)}
    >
      {props.members.map((member) => {
        if (member.user.enabled == true) {
          return (
            <Card
              radius="xs"
              key={member._id}
              withBorder
              sx={{ width: "100%" }}
              mb={12}
              py="xs"
              component={Link}
              to={`/user-profile/${member.user._id}`}
            >
              <Flex justify="space-between" align="center">
                <Avatar radius="xl" src={import.meta.env.VITE_BASE_IMAGE_URL + member.user.photo} />
                <Text>{member.user.name}</Text>
              </Flex>
            </Card>
          );
        } else return null;
      })}
    </Modal>
  );
};

export default GroupMembers;
