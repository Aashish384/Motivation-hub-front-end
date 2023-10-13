import { useEffect, useState } from "react";
import { Title, Text, Avatar, Loader, Group, Badge, Card, Button, Box, Flex } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { FiCheck } from "react-icons/fi";

import ReportModal from "./ReportModal";
import { getUserProfile, sendFriendRequest, reset } from "../../features/profile/profileSlice";
import { reportUser } from "../../features/user/userSlice";
import { errorNotification, successNotification } from "../../utils/showNotification";

const UserProfileInfo = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [why, setWhy] = useState("");
  const [opened, setOpened] = useState(false);

  const {
    userProfile,
    myProfile,
    userProfileLoading,
    error,
    isError,
    isSuccess,
    sendFriendRequestLoading,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserProfile(params.userId));
  }, []);

  useEffect(() => {
    if (isError) {
      errorNotification({ title: "Profile error", message: error });
    }
  }, [dispatch, isError, isSuccess, userProfile]);

  const sendFriendRequestHandler = () => {
    dispatch(sendFriendRequest({ userId: params.userId }));
    successNotification({ title: "Success", message: "Friend request send successfully" });
  };

  const reportUserHandler = () => {
    dispatch(
      reportUser({
        userId: userProfile._id,
        why,
      })
    );
  };

  let renderProfileInfo = <Loader />;

  if (userProfileLoading) {
    renderProfileInfo = <Loader />;
  } else if (isSuccess && userProfile && !userProfileLoading && myProfile) {
    const foundFriend = userProfile.friends.find((el) => el.user == myProfile._id);

    const numberOfFriends = userProfile.friends.filter((el) => el.status == "accepted");

    const isReported = userProfile.reports.findIndex(
      (report) => report.reporter._id == myProfile._id
    );

    renderProfileInfo = (
      <>
        <ReportModal
          opened={opened}
          setOpened={setOpened}
          reportUserHandler={reportUserHandler}
          why={why}
          setWhy={setWhy}
        />
        <Group sx={{ alignItems: "center" }} spacing="xs">
          <Avatar
            src={import.meta.env.VITE_BASE_IMAGE_URL + userProfile.photo}
            radius="xs"
            size={160}
          />
          <Flex direction="column" spacing={0} sx={{ maxWidth: 400 }}>
            <Title order={3}>{userProfile.name}</Title>
            <Text size="sm" color="secondary">
              @{userProfile.username}
            </Text>
            <Text size="sm" color="secondary" mb={6}>
              {userProfile.email}
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
            <Text mb={20} size="lg" weight={"700"}>
              {numberOfFriends.length} Friends
            </Text>
            {foundFriend && foundFriend.status === "accepted" ? (
              <Button
                variant="outline"
                size="xs"
                radius="xs"
                color="green"
                leftIcon={<FiCheck size={18} />}
                mb={10}
              >
                Friends
              </Button>
            ) : foundFriend &&
              (foundFriend.status === "sent" || foundFriend.status === "received") ? (
              <Button
                variant="outline"
                size="xs"
                radius="xs"
                leftIcon={<HiOutlineDotsCircleHorizontal size={18} />}
                mb={10}
              >
                Request Sent
              </Button>
            ) : (
              <Button
                variant="outline"
                size="xs"
                radius="xs"
                leftIcon={<BsPlus size={18} />}
                mb={10}
                onClick={sendFriendRequestHandler}
                loading={sendFriendRequestLoading}
              >
                Add Friend
              </Button>
            )}

            <br></br>
            {isReported < 0 ? (
              <Button size="xs" radius="xs" color="red" onClick={() => setOpened(true)}>
                Report
              </Button>
            ) : (
              // <Button
              //   size="xs"
              //   radius="xs"
              //   color="red"
              //   onClick={() => dispatch(reportUser(userProfile._id))}
              // >
              //   Report
              // </Button>
              <Button size="xs" radius="xs" color="red" variant="outline">
                Reported
              </Button>
            )}
          </Box>
        </Group>
        <Box mt={20}>
          {userProfile.likes && (
            <Flex gap={10} align="center" mb={12}>
              <Text weight={600} size="lg">
                Likes:{" "}
              </Text>
              <Text>{userProfile.likes}</Text>
            </Flex>
          )}
          {userProfile.dislikes && (
            <Flex gap={10} align="center" mb={12}>
              <Text weight={600} size="lg">
                Dislikes:{" "}
              </Text>
              <Text>{userProfile.dislikes}</Text>
            </Flex>
          )}
          {userProfile.hobbies && (
            <Flex gap={10} align="center" mb={12}>
              <Text weight={600} size="lg">
                Hobbies:{" "}
              </Text>
              <Badge radius="xs" size="lg">
                {userProfile.hobbies}
              </Badge>
            </Flex>
          )}
          {userProfile.problems && (
            <Flex gap={10} align="center" mb={12}>
              <Text weight={600} size="lg">
                Problems:{" "}
              </Text>
              <Text>{userProfile.problems}</Text>
            </Flex>
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

export default UserProfileInfo;
