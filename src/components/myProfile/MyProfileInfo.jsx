import { useEffect, useState } from "react";
import {
  Title,
  Text,
  Avatar,
  List,
  Loader,
  Group,
  Card,
  Button,
  Box,
  Flex,
  Badge,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";

import FriendRequests from "./FriendRequests";
import RemoveFriend from "./RemoveFriend";
import EditProfileModal from "./EditProfileModal";
import { errorNotification } from "../../utils/showNotification";

const MyProfileInfo = () => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);
  const [friendOpened, setFriendOpened] = useState(false);
  const [removeFriendOpened, setRemoveFriendOpened] = useState(false);

  const { myProfile, myProfileLoading, error, isError, isSuccess } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (isError) {
      errorNotification({ title: "Profile error", message: error });
    }
  }, [dispatch, isError, isSuccess, myProfile]);

  let renderProfileInfo = <Loader />;

  if (myProfileLoading) {
    renderProfileInfo = <Loader />;
  } else if (isSuccess && myProfile && !myProfileLoading) {
    renderProfileInfo = (
      <>
        <Group sx={{ alignItems: "center" }} spacing="xs">
          <EditProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            myProfile={myProfile}
          />
          <FriendRequests friendOpened={friendOpened} setFriendOpened={setFriendOpened} />
          <RemoveFriend opened={removeFriendOpened} setOpened={setRemoveFriendOpened} />
          <Avatar
            src={import.meta.env.VITE_BASE_IMAGE_URL + myProfile.photo}
            radius="xs"
            size={160}
          />
          <Flex direction="column" spacing={0} sx={{ maxWidth: 400 }}>
            <Title order={3}>{myProfile.name}</Title>
            <Text size="sm" color="secondary">
              @{myProfile.username}
            </Text>
            <Text size="sm" color="secondary" mb={6}>
              {myProfile.email}
            </Text>
          </Flex>
          <Box
            sx={{
              justifySelf: "flex-start",
              alignSelf: "flex-start",
              marginLeft: "auto",
              textAlign: "right",
            }}
          >
            <Button
              variant="outline"
              size="xs"
              radius="xs"
              leftIcon={<CiEdit size={18} />}
              mb={10}
              onClick={() => setModalOpened(true)}
            >
              Edit
            </Button>
            <br></br>
            <Button
              variant="outline"
              size="xs"
              radius="xs"
              mb={10}
              onClick={() => setRemoveFriendOpened(true)}
            >
              {myProfile.friends &&
                myProfile.friends.filter((el) => el.status === "accepted").length}
              &nbsp;Friends
            </Button>
            <br></br>
            <Button
              variant="outline"
              size="xs"
              radius="xs"
              mb={10}
              onClick={() => setFriendOpened(true)}
            >
              {myProfile.friends &&
                myProfile.friends.filter((el) => el.status === "received").length}
              &nbsp; Friend Requests
            </Button>
          </Box>
        </Group>
        <Box mt={20}>
          {myProfile.likes && (
            <>
              <Text weight={600} size="lg">
                Likes
              </Text>
              <List>
                <List.Item ml={12}>{myProfile.likes}</List.Item>
              </List>
            </>
          )}
          {myProfile.dislikes && (
            <>
              <Text weight={600} size="lg" mt={10}>
                Dislikes
              </Text>
              <List>
                <List.Item ml={12}>{myProfile.dislikes}</List.Item>
              </List>
            </>
          )}
          {myProfile.hobbies && (
            <>
              <Text weight={600} size="lg" mt={10}>
                Hobbies
              </Text>
              <List>
                <List.Item ml={12}>{myProfile.hobbies}</List.Item>
              </List>
            </>
          )}
          {myProfile.problems && (
            <>
              <Text weight={600} size="lg" mt={10}>
                Problems
              </Text>
              <List>
                <List.Item ml={12}>{myProfile.problems}</List.Item>
              </List>
            </>
          )}
        </Box>
      </>
    );
  }

  return (
    <Card withBorder shadow="md" radius="xs">
      {renderProfileInfo}
    </Card>
  );
};

export default MyProfileInfo;
