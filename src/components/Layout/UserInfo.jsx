import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  useMantineTheme,
  MediaQuery,
  Loader,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../../features/user/userSlice";
import { removeMyProfile } from "../../features/profile/profileSlice";
import UserInfoMenu from "./UserInfoMenu";

const UserInfo = () => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const { myProfile, myProfileLoading } = useSelector((state) => state.profile);

  const logoutUserHandler = () => {
    dispatch(logoutUser());
    dispatch(removeMyProfile());
  };

  if (!myProfile || myProfileLoading) {
    return <Loader />;
  }

  return (
    <Box>
      <UnstyledButton
        p="xs"
        radius="sm"
        sx={{
          display: "block",
          width: "100%",
        }}
      >
        {myProfile && (
          <Group>
            {/* <Avatar
              src={import.meta.env.VITE_BASE_IMAGE_URL + myProfile.photo}
              color="primary"
              radius="xl"
            /> */}
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Box sx={{ flex: 1 }}>
                <Text size="xs" weight={500}>
                  {myProfile.name}
                </Text>
                {/* <Text color="dimmed" size="xs">
                  {myProfile.email}
                </Text> */}
              </Box>
            </MediaQuery>
            <MediaQuery smallerThan="lg" styles={{ display: "none" }}>
              <Box sx={{ flex: 1 }}>
                <Text size="xs" weight={500}>
                  {myProfile.name}
                </Text>
                {/* <Text color="dimmed" size="xs">
                  {myProfile.email}
                </Text> */}
              </Box>
            </MediaQuery>

            <UserInfoMenu myProfile={myProfile} logoutUserHandler={logoutUserHandler} />
          </Group>
        )}
      </UnstyledButton>
    </Box>
  );
};

export default UserInfo;
