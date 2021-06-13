import firebase from "firebase";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  useColorModeValue,
  Text,
  Textarea,
  Button,
  Center,
  Input,
  Select,
} from "@chakra-ui/react";
import { Card } from "./Card";
import * as React from "react";
import { Posts } from "./Posts";
import { Navbar } from "./Navbar";
import { useHistory } from "react-router-dom";
import { VideoTable } from "./VideoTable";
export const Home = () => {
  let [posts, setPosts] = useState([]);
  let [dates, setDates] = useState([]);
  let [currentLikes, setCurrentLikes] = useState([]);
  let [currentVideos, setCurrentVideos] = useState([]);
  let [categories, setCategories] = useState([]);
  let [videoTitles, setVideoTitles] = useState([])
  let history = useHistory();

  let user_token = firebase.auth().currentUser.getIdToken();

  let user = {
    header: "Access-Control-Allow-Origin",
    token: user_token,
    email: firebase.auth().currentUser.email,
  };

  useEffect(() => {
    axios.post("http://localhost:5000/home", user).then((res) => {
      fetch("http://localhost:5000/get-posts", { credentials: "include" }).then(
        (response) => {
          response.json().then((data) => {
            setPosts(data.data[0].reverse());
            setDates(data.data[1].reverse());
            setCurrentLikes(data.data[2].reverse());
            setCategories(data.data[3].reverse());
            setVideoTitles(data.data[4].reverse())
            setCurrentVideos(data.data[5].reverse());
          });
        }
      );
    });
  }, []);

  let [value, setValue] = useState("");
  let [category, setCategory] = useState("");
  let [videoName, setVideoName] = useState("")

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  let handleCategoryChange = (e) => {
    let categoryValue = e.target.value;
    setCategory(categoryValue);
  };

  let handleVideoChange = (e) => {
    let videoValue = e.target.value;
    setVideoName(videoValue);
  };


  let submitPost = (e) => {
    let postText = {
      header: "Access-Control-Allow-Origin",
      email: firebase.auth().currentUser.email,
      text: value,
      noteCategory: category,
      video: videoName
    };
    axios.post("http://localhost:5000/add-post", postText).then((res) => {
      setPosts(res.data.data[0].reverse());
      setDates(res.data.data[1].reverse());
      setCurrentLikes(res.data.data[2].reverse());
      setCategories(res.data.data[3].reverse());
      setVideoTitles(res.data.data[4].reverse())
      setCurrentVideos(res.data.data[5].reverse());
    });
    setValue("");
    setCategory("");
  };

  let signOut = () => {
    firebase.auth().signOut();
    history.push("/");
  };

  const bg_mode = useColorModeValue("gray.50", "inherit");
  return (
    <div>
      <Navbar />
      <Box
        bg={bg_mode}
        minH="100vh"
        py="12"
        px={{
          base: "4",
          lg: "8",
        }}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
      >
        <Box maxW="md" mx="auto">
          <Center>
            <Heading color="white" fontSize="6xl" fontWeight="extrabold">
              Your Profile
            </Heading>
          </Center>
          <br />
          <Card>
            <Text textAlign="center">
              Welcome
              <Text
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontWeight="bold"
              >
                {firebase.auth().currentUser.displayName}
              </Text>
            </Text>
            <br />
            <div align="center">
              <img src={firebase.auth().currentUser.photoURL}></img>
            </div>
            <br />
            <Center>
              <Button
                align="center"
                color={"white"}
                onClick={signOut}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
              >
                Sign Out
              </Button>
            </Center>
          </Card>
        </Box>
        <br />
        <br />
        <Heading color="white" fontSize="6xl" fontWeight="extrabold" textAlign="center">
          Your Videos
        </Heading>
        <br />
        <br />
        <br />
        <VideoTable videos={currentVideos} />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Box>
    </div>
  );
};
