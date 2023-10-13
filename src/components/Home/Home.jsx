import { Box, Text, Flex, Title, Image, Container, Card, SimpleGrid } from "@mantine/core";

const Home = () => {
  return (
    <div
      style={
        {
          // position: "relative",
          // backgroundImage:
          //   "linear-gradient(90deg, rgba(0,0 , 0, 0.3), rgba(0, 0, 0, 0.3)),url(" +
          //   `https://images.unsplash.com/photo-1607214368910-d7b795724be4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80` +
          //   ")",
          // zIndex: 10000,
          // backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",
          // backgroundSize: "cover",
          // height: "100vh",
        }
      }
    >
      {/* <Box
        mt={100}
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          margin: "auto",
        }}
      >
        <Flex direction="column" sx={{ flex: 1 }} mb={40}>
          <Title order={1} color="white" align="left">
            “Change doesn’t just happen. It happens with urgency.”
          </Title>
          <Text size="xl" align="left">
            Leanne Pittsford
          </Text>
        </Flex>
        <Flex direction="column" sx={{ flex: 1 }} mb={40}>
          <Title order={1} color="white" align="right">
            “The greatest glory in living lies not in never falling, but in rising every time we
            fall.”
          </Title>
          <Text ml="auto" size="xl">
            Nelson Mandela
          </Text>
        </Flex>
        <Flex direction="column" sx={{ flex: 1 }}>
          <Title order={1} color="white" align="left">
            “If life were predictable it would cease to be life, and be without flavor.”
          </Title>
          <Text size="xl" align="left">
            Eleanor Roosevelt
          </Text>
        </Flex>
      </Box> */}
      <Container size={"lg"}>
        <Title align="center" mt={60} sx={{ fontSize: "60px" }}>
          MOTIVATION HUB
        </Title>
        {/* <Flex justify={"center"} mt={22}> */}
        {/* </Flex> */}
        <Title align="center" weight={500} order={2} mt={12}>
          CHOOSE US,CHOOSE HEALTH
        </Title>
        <Flex mt={80} gap={40}align='center'>
          <Box sx={{ width: 1000 }}>
            <Image src={"/about.jpg"} width={"100%"} radius={"sm"} />
          </Box>
          <Box>
            <Title order={3} weight={700} mb={20}>
              About Website
            </Title>
            <Text mb={20} align="justify">
             "Motivational Hub" provides a positive and motivational online space as an alternative
              to negative influences found on social media.
            </Text>
            <Text align="justify" weight={600}>
              "Every morning you have two choices: continue to sleep with your dreams or wake up and
              chase them." – Arnold Schwarzenegger
            </Text>
          </Box>
        </Flex>

        <Box my={60}>
          <Title order={3} weight={600} mb={20} align="center">
            Our Services
          </Title>
          <Flex>
            <SimpleGrid cols={2} spacing={40}>
              <Card withBorder shadow="lg" p={0}>
                <Image src={"/connect-people.jpg"} height={250} />
                <Box px={"lg"}>
                  <Title order={3} weight={600} mt={12}>
                    Connect People
                  </Title>
                  <Text align="justify">
                    Users can connect with like-minded individuals for mutual motivation and support
                    in various aspects of life.
                  </Text>
                </Box>
              </Card>
              <Card withBorder shadow="lg" p={0}>
                <Image src={"/expert-guidance.jpg"} height={250} />
                <Box px={"lg"} pb={20}>
                  <Title order={3} weight={600} mt={12}>
                    Expert Guidance
                  </Title>
                  <Text align="justify">
                    Users can engage in motivational and healthy challenges guided by experts or
                    professionals.
                  </Text>
                </Box>
              </Card>
            </SimpleGrid>
          </Flex>
        </Box>
        <Box my={60}>
          <Title order={3} weight={600} mb={20} align="center">
            Our Work
          </Title>
          <SimpleGrid cols={3} spacing={40}>
            <Image
              src={"/our-work1.jpg"}
              height={250}
              sx={(theme) => ({
                transition: "transform 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              })}
            />
            <Image
              src={"/our-work2.jpg"}
              height={250}
              sx={(theme) => ({
                transition: "transform 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              })}
            />
            <Image
              src={"/our-work3.jpg"}
              height={250}
              sx={(theme) => ({
                transition: "transform 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              })}
            />
            <Image
              src={"/our-work4.jpg"}
              height={250}
              sx={(theme) => ({
                transition: "transform 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              })}
            />
            <Image
              src={"/our-work5.jpg"}
              height={250}
              sx={(theme) => ({
                transition: "transform 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              })}
            />
            <Image
              src={"/our-work6.jpg"}
              height={250}
              sx={(theme) => ({
                transition: "transform 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              })}
            />
            <Image
              src={"/our-work7.jpg"}
              height={250}
              sx={(theme) => ({
                transition: "transform 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              })}
            />
            <Image
              src={"/our-work8.jpg"}
              height={250}
              sx={(theme) => ({
                transition: "transform 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              })}
            />
            <Image
              src={"/work9.jpg"}
              height={250}
              sx={(theme) => ({
                transition: "transform 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              })}
            />
          </SimpleGrid>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
