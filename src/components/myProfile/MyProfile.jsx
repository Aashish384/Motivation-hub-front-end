import { Box, Container } from "@mantine/core";

import MyProfileInfo from "./MyProfileInfo";

const MyProfile = () => {
  return (
    <Box>
      <Container size="xl">
        <MyProfileInfo />
      </Container>
    </Box>
  );
};

export default MyProfile;
