import React from "react";
import { Post } from "./Post";
import { Flex, Icon, Box, chakra } from "@chakra-ui/react";

import { BsLightningFill } from "react-icons/bs";

export const Posts = ({ posts, dates, likes, categories }) => {
  let finalPosts = [];
  for (let i = 0; i < posts.length; i++) {
    let x = [posts[i], dates[i], likes[i], categories[i]];
    finalPosts.push(x);
  }
  const bg1 = "gray.800";
  const bg2 = "red.400";
  const bg3 = "gray.200";

  if (finalPosts.length > 0) {
    return (
      <div>
        <br />
        {finalPosts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    );
  } else {
    return (
      <Flex
        maxW="sm"
        w="full"
        mx="auto"
        bg={bg1}
        shadow="md"
        rounded="lg"
        overflow="hidden"
      >
        <Flex justifyContent="center" alignItems="center" w={12} bg="blue.500">
          <Icon as={BsLightningFill} color="white" boxSize={6} />
        </Flex>

        <Box mx={-3} py={2} px={4}>
          <Box mx={3}>
            <chakra.span color="blue.300" fontWeight="bold">
              No Notes 😕
            </chakra.span>
            <chakra.p color={bg3} fontSize="sm">
              You haven't created any notes yet!
            </chakra.p>
          </Box>
        </Box>
      </Flex>
    );
  }
};
