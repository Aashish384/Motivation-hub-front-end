import { Box, Container, Button, Loader, Flex, Title, SimpleGrid } from "@mantine/core";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Group from "./Group";
import { fetchGroups } from "../../features/group/groupSlice";
import { errorNotification } from "../../utils/showNotification";

const Groups = () => {
  const dispatch = useDispatch();

  const { error, isError, isSuccess, groups, fetchGroupsLoading } = useSelector(
    (state) => state.group
  );

  const { addGroupMemberError } = useSelector((state) => state.group);

  const { user } = useSelector((state) => state.user);
  const { myProfile, myProfileLoading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  useEffect(() => {
    if (isError) {
      errorNotification({ title: "Group error", message: error });
    }
  }, [dispatch, isError, isSuccess, groups]);

  useEffect(() => {
    if (addGroupMemberError) {
      errorNotification({ title: "Group error", message: error });
    }
  }, [dispatch, addGroupMemberError]);

  let renderGroups = <Loader />;

  if (fetchGroupsLoading || myProfileLoading) {
    renderGroups = <Loader />;
  } else if (groups && isSuccess && !myProfileLoading) {
    renderGroups = (
      <Container size="xl">
        <Flex justify="space-between">
          <Title order={3} mb={16}>
            Groups
          </Title>
          {/* {(myProfile.role === "expert" || myProfile.role === "user") && ( */}
          <Button radius="xs" component={Link} to="/add-group">
            Create new Group
          </Button>
          {/* )} */}
        </Flex>

        <SimpleGrid cols={3} spacing={16}>
          {groups.map((group) => (
            <Group key={group._id} group={group} user={user} userRole={myProfile.role} />
          ))}
        </SimpleGrid>
      </Container>
    );
  }

  return <Box>{renderGroups}</Box>;
};

export default Groups;
