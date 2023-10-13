import { useEffect } from "react";
import {
  Box,
  Modal,
  Button,
  Group,
  TextInput,
  Loader,
  Flex,
  Card,
  Text,
  Avatar,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { getFriendRequests, acceptFriendRequest, reset } from "../../features/profile/profileSlice";

const FriendRequests = (props) => {
  const dispatch = useDispatch();

  const {
    friendRequests,
    getFriendRequestsError,
    getFriendRequestsSuccess,
    getFriendRequestsLoading,
    acceptFriendRequestSuccess,
    error,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getFriendRequests());
  }, []);

  useEffect(() => {
    if (acceptFriendRequestSuccess) {
      window.location.reload();
    }
  }, [acceptFriendRequestSuccess]);

  useEffect(() => {
    if (getFriendRequestsError) {
      errorNotification({ title: "Friend requests error", message: error });
    }
  }, [dispatch, getFriendRequestsError, getFriendRequestsSuccess, friendRequests]);

  let renderFriends = <Loader />;

  if (getFriendRequestsLoading) {
    renderFriends = <Loader />;
  } else if (getFriendRequestsSuccess && friendRequests) {
    renderFriends = (
      <Flex direction="column">
        {friendRequests.map((fr) => (
          <Card key={fr._id} withBorder sx={{ width: "100%" }} mb={12}>
            <Flex justify="space-between" align="center">
              <Avatar radius="xl" src={import.meta.env.VITE_BASE_IMAGE_URL + fr.user.photo} />
              <Text>{fr.user.name}</Text>
              <Button
                radius="xs"
                onClick={() => dispatch(acceptFriendRequest({ userId: fr.user._id }))}
              >
                Accept
              </Button>
            </Flex>
          </Card>
        ))}
      </Flex>
    );
  }

  return (
    <Modal
      title="Received friend requests"
      size="sm"
      opened={props.friendOpened}
      onClose={() => props.setFriendOpened(false)}
    >
      {renderFriends}
    </Modal>
  );
};

export default FriendRequests;
