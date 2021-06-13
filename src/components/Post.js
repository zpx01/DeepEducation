import React from "react";
import { Break } from "./Break";
import {
  Box,
  Heading,
  useColorModeValue,
  Text,
  Textarea,
  Button,
  Center,
  Input,
} from "@chakra-ui/react";
import { Card } from "./Card";
import { useEffect, useState } from "react";
import axios from "axios";
import firebase from "firebase";

export const Post = ({ post }) => {
  let [likes, setLikes] = useState(1);
  if (likes !== post[2]) {
    setLikes(post[2]);
  }

  let user_token = firebase.auth().currentUser.getIdToken();
  let user = {
    header: "Access-Control-Allow-Origin",
    token: user_token,
    email: firebase.auth().currentUser.email,
  };

  const likePost = () => {
    setLikes((likes += 1));
    let post_data = {
      header: "Access-Control-Allow-Origin",
      text: post[0],
    };
    axios.post("http://localhost:5000/home", user).then((response) => {
      axios.post("http://localhost:5000/like", post_data).then((res) => {
        post[2] = res.data.data;
        setLikes(post[2]);
        console.log(res.data.data);
      });
    });
  };

  return (
    <Box maxW="md" mx="auto">
      <Card bgGradient="linear(to-r, blue.300, blue.500)">
        <Text
          mb="8px"
          bgColor="white"
          bgClip="text"
          fontWeight="extrabold"
          textAlign="center"
          fontSize="lg"
        >
          Note:
        </Text>
        <Text textAlign="center" mb="8px" color="white">
          {post[0]}
        </Text>
        <Break />
        <Text
          mb="8px"
          bgColor="white"
          bgClip="text"
          fontWeight="extrabold"
          textAlign="center"
          fontSize="lg"
        >
          Date:
        </Text>
        <Text textAlign="center" mb="8px" color="white">
          {post[1]}
        </Text>
        <Break />
        <Center>
          <Button
            fontFamily={"heading"}
            mt={4}
            // w={'full'}
            colorScheme="facebook"
            _hover={{
              bgGradient: "linear(to-r, blue.200, gray.100)",
              boxShadow: "xl",
            }}
            onClick={likePost}
          >
            Like
          </Button>
        </Center>
        <Break />
        <Text
          mb="8px"
          bgColor="white"
          bgClip="text"
          fontWeight="extrabold"
          fontSize="lg"
          textAlign="center"
        >
          Likes:
        </Text>
        <Text mb="8px" textAlign="center" color="white">
          {likes}
        </Text>
        <Break />
        <Text
          mb="8px"
          bgColor="white"
          bgClip="text"
          fontWeight="bold"
          textAlign="center"
        >
          Category:
        </Text>
        <Text mb="8px" textAlign="center" color="white">
          {post[3]}
        </Text>
      </Card>
      <Break />
    </Box>
  );
};
