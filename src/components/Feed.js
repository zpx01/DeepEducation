import firebase from "firebase";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Heading,
  useColorModeValue,
  Text,
  Textarea,
  Button,
  Center,
  Input,
  Grid,
  Image,
  Link,
  chakra,
  HStack,
  IconButton,
  Icon,
  AiOutlineMenu,
  VStack,
  CloseButton,
  BsFillCameraVideoFill,
  Avatar,
  Spacer,
  useDisclosure,
  AiFillHome,
  Logo,
  ChakraProvider,
  Select,
  GridItem,
} from "@chakra-ui/react";
import { Card } from "./Card";
import * as React from "react";
import { Posts } from "./Posts";
import { VideoTable } from "./VideoTable";
import { Navbar } from "./Navbar";
import { LanguageSelect } from "./LanguageSelect";

export const Feed = () => {
  let [posts, setPosts] = useState([]);
  let [dates, setDates] = useState([]);
  let [currentLikes, setCurrentLikes] = useState([]);
  let [categories, setCategories] = useState([]);
  let [currentVideos, setCurrentVideos] = useState([]);
  let [translate_lang, setTranslateLang] = useState("");
  let [videoTitles, setVideoTitles] = useState([]);
  const languageDict = {
    Afrikaans: ["af-ZA", "af-ZA-Standard-A", "FEMALE"],
    Arabic: ["ar-XA", "	ar-XA-Wavenet-C", "MALE"],
    Bengali: ["bn-IN", "bn-IN-Wavenet-B", "MALE"],
    Bulgarian: ["bg-BG", "bg-bg-Standard-A", "FEMALE"],
    Catalan: ["ca-ES", "ca-es-Standard-A", "FEMALE"],
    Chinese: ["yue-HK", "yue-HK-Standard-D", "MALE"],
    Czech: ["cs-CZ", "cs-CZ-Wavenet-A", "FEMALE"],
    Danish: ["da-DK", "da-DK-Wavenet-C", "MALE"],
    Dutch: ["ni-NL", "nl-NL-Wavenet-C", "MALE"],
    English: ["en-US", "en-US-Wavenet-J", "MALE"],
    Finnish: ["fi-FI", "fi-FI-Wavenet-A", "FEMALE"],
    Filipino: ["fil-PH", "fil-PH-Wavenet-D", "MALE"],
    French: ["fr-FR", "fr-FR-Wavenet-D", "MALE"],
    German: ["de-DE", "de-DE-Wavenet-E", "MALE"],
    Greek: ["el-GR", "el-GR-Wavenet-A", "FEMALE"],
    Gujarati: ["gu-IN", "gu-IN-Wavenet-B", "MALE"],
    Hindi: ["hi-IN", "hi-IN-Wavenet-C", "MALE"],
    Hungarian: ["hu-HU", "hu-HU-Wavenet-A", "FEMALE"],
    Icelandic: ["is-IS", "is-is-Standard-A", "FEMALE"],
    Indonesian: ["id-ID", "id-ID-Wavenet-C", "MALE"],
    Italian: ["it-IT", "it-IT-Wavenet-D", "MALE"],
    Japanese: ["ja-JP", "ja-JP-Wavenet-D", "MALE"],
    Kannada: ["kn-IN", "	kn-IN-Wavenet-B", "MALE"],
    Korean: ["ko-KR", "ko-KR-Wavenet-D", "MALE"],
    Latvian: ["lv-LV", "lv-lv-Standard-A", "MALE"],
    Malayalam: ["ml-IN", "ml-IN-Wavenet-B", "MALE"],
    Mandarin: ["cmn-TW", "cmn-TW-Wavenet-C", "MALE"],
    Polish: ["pl-PL", "pl-PL-Wavenet-C", "MALE"],
    Portruguese: ["pt-PT", "pt-PT-Wavenet-C", "MALE"],
    Romanian: ["ro-RO", "ro-RO-Wavenet-A", "FEMALE"],
    Russian: ["ru-RU", "ru-RU-Wavenet-D", "MALE"],
    Slovak: ["sk-SK", "sk-SK-Wavenet-A", "FEMALE"],
    Serbian: ["sr-RS", "sr-rs-Standard-A", "FEMALE"],
    Spanish: ["es-US", "es-US-Wavenet-C", "MALE"],
    Swedish: ["sv-SE", "sv-SE-Wavenet-A", "FEMALE"],
    Tamil: ["ta-IN", "ta-IN-Wavenet-B", "MALE"],
    Thai: ["th-TH", "th-TH-Standard-A", "FEMALE"],
    Telegu: ["te-IN", "te-IN-Standard-B", "MALE"],
    Turkish: ["tr-TR", "tr-TR-Wavenet-E", "MALE"],
    Ukrainian: ["uk-UA", "uk-UA-Wavenet-A", "MALE"],
    Vietnam: ["vi-VN", "vi-VN-Wavenet-D", "MALE"],
  };

  
  const languages = Object.keys(languageDict);

  let user_token = firebase.auth().currentUser.getIdToken();

  let [title, setTitle] = useState("");
  let [url, setURL] = useState("");

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setTitle(inputValue);
  };

  let handleURL = (e) => {
    let inputURL = e.target.value;
    setURL(inputURL);
  };

  let user = {
    header: "Access-Control-Allow-Origin",
    token: user_token,
    email: firebase.auth().currentUser.email,
  };

  let [value, setValue] = useState("");
  let [category, setCategory] = useState("");
  let [videoName, setVideoName] = useState("")

  let handleInputChange2 = (e) => {
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
  let submitVideo = (e) => {
    let videoInfo = {
      header: "Access-Control-Allow-Origin",
      email: firebase.auth().currentUser.email,
      title: title,
      url: url,
      language: translate_lang,
    };
    axios.post("http://localhost:5000/home", user).then((response) => {
      axios.post("http://localhost:5000/add-video", videoInfo).then((res) => {
        setPosts(res.data.data[0].reverse());
        setDates(res.data.data[1].reverse());
        setCurrentLikes(res.data.data[2].reverse());
        setCategories(res.data.data[3].reverse());
        setVideoTitles(res.data.data[4].reverse());
        setCurrentVideos(res.data.data[5].reverse());
      });
    });
    setTitle("");
    setURL("");
    setCategories("");
  };

  let handleTranslateLangChange = (e) => {
    let translateTo = e.target.value;
    setTranslateLang(translateTo);
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
            setVideoTitles(data.data[4].reverse());
            setCurrentVideos(data.data[5].reverse());
          });
        }
      );
    });
  }, []);

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
              Videos
            </Heading>
          </Center>
          <br />
          <br />
        </Box>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Box w="100%" mx="auto">
          <Card>
            <Box as={"form"} mt={6}>
              <Text
                mb="8px"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontWeight="bold"
                textAlign="center"
              >
                Video Title:
              </Text>
              <Text mb="8px" textAlign="center">
                {title}
              </Text>
            
              <Input
                value={title}
                onChange={handleInputChange}
                placeholder="Enter the title of the video."
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <br />
              <br />
              <Text
                mb="8px"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontWeight="bold"
                textAlign="center"
              >
                Youtube URL:
              </Text>
              <Input
                value={url}
                onChange={handleURL}
                placeholder="Enter the URL of the YouTube video."
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <br />
              <br />
              <Text
                mb="8px"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontWeight="bold"
                textAlign="center"
              >
                Translate To:
              </Text>
              <Select
                isSearchable={true}
                variant="filled"
                value={translate_lang}
                onChange={handleTranslateLangChange}
                placeholder="Choose a language."
              >
                {languages.map((lang) => (
                  <option value={lang}>{lang}</option>
                ))}
              </Select>
              <br />
              <br />
              <Center>
                <Button
                  fontFamily={"heading"}
                  mt={4}
                  // w={'full'}
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,pink.400)",
                    boxShadow: "xl",
                  }}
                  onClick={submitVideo}
                >
                  Submit
                </Button>
              </Center>
            </Box>
          </Card>
        </Box>
        <Box w="100%" mx="auto">
          <Card>
            <Box as={"form"} mt={6}>
              <Text
                mb="8px"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontWeight="bold"
                textAlign="center"
              >
                Note:
              </Text>
              <Text mb="8px" textAlign="center">
                {value}
              </Text>
           
              <Input
                value={value}
                onChange={handleInputChange2}
                placeholder="Write a note."
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <br />
              <br />
              <Text
                mb="8px"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontWeight="bold"
                textAlign="center"
              >
                Category:
              </Text>
              <Select
                isSearchable={true}
                variant="filled"
                value={category}
                onChange={handleCategoryChange}
                placeholder="Choose a category."
              >
                <option value="Definition">Definition</option>
                <option value="Summary">Summary</option>
                <option value="Misc.">Misc.</option>
              </Select>
              <br />
          
              <Text
                mb="8px"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontWeight="bold"
                textAlign="center"
              >
                Video:
              </Text>
              <Select
                isSearchable={true}
                variant="filled"
                value={videoName}
                onChange={handleVideoChange}
                placeholder="Choose a video."
              >
                {currentVideos.map(video => <option value={video[0]}>{video[0]}</option>)}
              </Select>
            </Box>
            <br />
            <br />
            <Center>
              <Button
                fontFamily={"heading"}
                mt={4}
                // w={'full'}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
                onClick={submitPost}
              >
                Submit
              </Button>
            </Center>
          </Card>
        </Box>
        </Grid>
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
