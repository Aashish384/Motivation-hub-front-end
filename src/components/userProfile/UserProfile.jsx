import { Box, Container } from "@mantine/core";

import UserProfileInfo from "./UserProfileInfo";

const UserProfile = () => {
  return (
    <Box>
      <Container size="xl">
        <UserProfileInfo />
      </Container>
    </Box>
  );
};

export default UserProfile;
