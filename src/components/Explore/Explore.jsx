import {
  Box,
  Button,
  Loader,
  Card,
  Flex,
  Title,
  SimpleGrid,
  TextInput,
  Image,
} from "@mantine/core";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";

import { fetchChallenges } from "../../features/challenge/challengeSlice";
import { fetchGroups } from "../../features/group/groupSlice";

const Explore = () => {
  const dispatch = useDispatch();

  const { fetchGroupsLoading, groups } = useSelector((state) => state.group);
  const isGroupsSuccess = useSelector((state) => state.group.isSuccess);
  const { challenges, fetchChallengesLoading } = useSelector((state) => state.challenge);
  const isChallengesSuccess = useSelector((state) => state.challenge.isSuccess);

  useEffect(() => {
    dispatch(fetchChallenges());
    dispatch(fetchGroups());
  }, []);

  let renderExplore = <Loader />;

  if (fetchChallengesLoading || fetchGroupsLoading) {
    renderExplore = <Loader />;
  } else if (isGroupsSuccess && isChallengesSuccess && groups && challenges) {
    renderExplore = (
      <Box>
        <Flex justify="space-between">
          <Title order={4} mt={12} mb={16}>
            Challenges For You
          </Title>
          <Button radius="xs" variant="outline" component={Link} to="/challenges">
            View More
          </Button>
        </Flex>

        <SimpleGrid cols={4} spacing={50}>
          {challenges.slice(0, 4).map((challenge) => (
            <Card withBorder p={0} key={challenge._id} radius="xs">
              {challenge.image ? (
                <Image src={import.meta.env.VITE_BASE_IMAGE_URL + challenge.image} height={200} />
              ) : (
                <Box
                  sx={(theme) => ({
                    height: 200,
                    width: "100%",
                    backgroundColor: theme.colors.gray[3],
                  })}
                ></Box>
              )}
              <Title order={6} px={10} my={10}>
                {challenge.title}
              </Title>
            </Card>
          ))}
        </SimpleGrid>

        <Flex justify="space-between">
          <Title order={4} mt={20} mb={16}>
            Groups For You
          </Title>
          <Button radius="xs" variant="outline" component={Link} to="/groups">
            View More
          </Button>
        </Flex>

        <SimpleGrid cols={4} spacing={50}>
          {groups.slice(0, 4).map((group) => (
            <Card withBorder p={0} key={group._id} radius="xs">
              <Image src={import.meta.env.VITE_BASE_IMAGE_URL + group.image} height={200} />
              <Title order={6} px={10} my={10}>
                {group.title}
              </Title>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  return (
    <Box mx={16}>
      {/* <TextInput
        icon={<CiSearch size={20} />}
        radius="xs"
        placeholder="Search..."
        sx={{ margin: "auto", maxWidth: 500 }}
      /> */}
      {renderExplore}
    </Box>
  );
};

export default Explore;
