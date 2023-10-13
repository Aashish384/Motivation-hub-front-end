import { useEffect } from "react";
import { Modal, Button, Loader, Flex, Card, Text, Avatar } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { getFriends, removeFriend } from "../../features/profile/profileSlice";

const RemoveFriend = (props) => {
  const dispatch = useDispatch();

  const { friends, friendsLoading, friendsSuccess, friendsError, removeFriendSuccess, error } =
    useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getFriends());
  }, []);

  useEffect(() => {
    if (friendsError) {
      errorNotification({ title: "Friends error", message: error });
    }
  }, [dispatch, friendsSuccess, friendsError, friends]);

  useEffect(() => {
    if (removeFriendSuccess) {
      window.location.reload();
    }
  }, [removeFriendSuccess]);

  let renderFriends = <Loader />;

  if (friendsLoading) {
    renderFriends = <Loader />;
  } else if (friendsSuccess && friends) {
    renderFriends = (
      <Flex direction="column">
        {friends.map((fr) => (
          <Card key={fr._id} withBorder sx={{ width: "100%" }} mb={12}>
            <Flex justify="space-between" align="center">
              <Avatar radius="xl" src={import.meta.env.VITE_BASE_IMAGE_URL + fr.user.photo} />
              <Text>{fr.user.name}</Text>
              <Button
                color="red"
                radius="xs"
                onClick={() => dispatch(removeFriend({ userId: fr.user._id }))}
              >
                Remove
              </Button>
            </Flex>
          </Card>
        ))}
      </Flex>
    );
  }

  return (
    <Modal
      title="Your Friends"
      size="sm"
      opened={props.opened}
      onClose={() => props.setOpened(false)}
    >
      {renderFriends}
    </Modal>
  );
};

export default RemoveFriend;
