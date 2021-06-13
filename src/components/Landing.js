import React from "react";
import {
  chakra,
  Box,
  useColorModeValue,
  Icon,
  Image,
  HStack,
  Stack,
  Button,
  Flex,
  SimpleGrid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { Break } from "./Break";

export const Landing = ({ isSignedIn }) => {
  let history = useHistory();

  const goToLogin = () => {
    history.push("/login");
  };
  const goToFeed = () => {
    history.push("/videos");
  };

  const bg1 = useColorModeValue("gray.900", "white");
  const bg2 = useColorModeValue("brand.600", "brand.400");

  const Feature = (props) => {
    return (
      <Flex>
        <Flex shrink={0}>
          <Icon
            boxSize={5}
            mt={1}
            mr={2}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </Icon>
        </Flex>
        <Box ml={6}>
          <chakra.dt fontSize="lg" fontWeight="bold" lineHeight="6">
            {props.title}
          </chakra.dt>
          <chakra.dd mt={2}>{props.children}</chakra.dd>
        </Box>
      </Flex>
    );
  };

  if (isSignedIn === true) {
    return (
      <div>
        <Box
          minH="5xl"
          py="12"
          px={{
            base: "4",
            lg: "8",
          }}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          alignContent="center"
        >
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Box pos="relative" overflow="hidden">
            <Box maxW="7xl" mx="auto">
              <Box
                pos="relative"
                pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
                w="full"
                border="solid 1px transparent"
              >
                <Box
                  mt={10}
                  mx="auto"
                  maxW={{ base: "7xl" }}
                  px={{ base: 4, sm: 6, lg: 8 }}
                  mt={{ base: 12, md: 16, lg: 20, xl: 28 }}
                >
                  <Box
                    textAlign="center"
                    w={{ base: "full", md: 11 / 12, xl: 8 / 12 }}
                    mx="auto"
                  >
                    <chakra.h1
                      fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                      letterSpacing="tight"
                      lineHeight="short"
                      fontWeight="extrabold"
                      color="white"
                    >
                      <chakra.span display={{ base: "block", xl: "inline" }}>
                        Break Language Barriers with{" "}
                      </chakra.span>
                      <chakra.span
                        display={{ base: "block", xl: "inline" }}
                        color="twitter.100"
                      >
                        DeepEducation
                      </chakra.span>
                    </chakra.h1>
                    <chakra.p
                      mt={{ base: 3, sm: 5, md: 8 }}
                      mx={12}
                      mb={10}
                      fontSize={{ base: "lg", md: "xl" }}
                      color="facebook.100"
                      lineHeight="base"
                    >
                      An educational platform that uses artificial intelligence
                      to translate video content to increase educational equity
                      and accessibility.
                    </chakra.p>
                    <Stack
                      direction={{ base: "column", sm: "column", md: "row" }}
                      mb={{ base: 4, md: 8 }}
                      spacing={{ base: 4, md: 2 }}
                      justifyContent="center"
                    >
                      <Button
                        size="md"
                        variant="ghost"
                        bgGradient="linear(to-r, blue.100, blue.300)"
                        onClick={goToFeed}
                      >
                        {firebase.auth().currentUser.displayName}'s Videos
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <br />
        <br />
        <Text
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
          textAlign="center"
        >
          Features
        </Text>
        <Flex p={20} w="auto" justifyContent="center" alignItems="center">
          <Box
            shadow="3xl"
            px={8}
            py={20}
            mx="auto"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            rounded="lg"
          >
            <SimpleGrid
              alignItems="center"
              columns={{ base: 1, lg: 3 }}
              spacingY={{ base: 10, lg: 32 }}
              spacingX={{ base: 10, lg: 24 }}
            >
              <Box alignSelf="start" color="white">
                <chakra.h2
                  fontWeight="semibold"
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  A Universal Platform
                </chakra.h2>
                <chakra.h2
                  mb={3}
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="extrabold"
                  textAlign={{ base: "center", sm: "left" }}
                  lineHeight="shorter"
                  letterSpacing="tight"
                >
                  Translate Lectures Instantly
                </chakra.h2>
                <chakra.p
                  mb={6}
                  fontSize={{ base: "lg", md: "xl" }}
                  textAlign={{ base: "center", sm: "left" }}
                >
                  DeepEducation breaks language barriers by allowing learners to
                  translate online educational videos into any language.
                </chakra.p>
              </Box>
              <GridItem colSpan={2} color="white">
                <Stack
                  spacing={{ base: 10, md: 0 }}
                  display={{ md: "grid" }}
                  gridTemplateColumns={{ md: "repeat(2,1fr)" }}
                  gridColumnGap={{ md: 8 }}
                  gridRowGap={{ md: 10 }}
                >
                  <Feature title="Translate Rapidly">
                    Our Google Cloud Machine Learning backend enables users to
                    translate their lecture videos in under a minute ⏱{" "}
                  </Feature>
                  <Feature title="Personal Security">
                    Login instantaneously using Google, Facebook, GitHub, or
                    your email. We will never share any user data with
                    third-party services 🔒
                  </Feature>
                  <Feature title="Expand Your Educational Experience">
                    {" "}
                    Our amazing platform allows users to gain access to millions
                    of new educational videos. Learn about new cultures, ideas,
                    and concepts by translating content to your preferred
                    language 🗣
                  </Feature>
                  <Feature title="Take Notes on Important Concepts">
                    {" "}
                    DeepEducation allows users to take notes and summarize video
                    transcripts to provide an efficient educational experience
                    ✍️{" "}
                  </Feature>
                  <Feature title="Accessibility">
                    {" "}
                    Translate educational videos in over 40 languages and
                    generate translated transcripts to easily follow along. Additionally,
                    our DeepDub feature uses a neural network for face manipulation, making the videos
                    much more natural 📚
                  </Feature>
                  <Feature title="Organize Your Learning Journey">
                    {" "}
                    Our user-friendly platform allows learners to categorize
                    their notes and develop notes for each of their translated
                    videos 📝{" "}
                  </Feature>
                </Stack>
              </GridItem>
            </SimpleGrid>
          </Box>
        </Flex>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  } else {
    return (
      <div>
        <Box
          minH="100vh"
          py="12"
          px={{
            base: "4",
            lg: "8",
          }}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
        >
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Box pos="relative" overflow="hidden">
            <Box maxW="7xl" mx="auto">
              <Box
                pos="relative"
                pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
                w="full"
                border="solid 1px transparent"
              >
                <Box
                  mt={10}
                  mx="auto"
                  maxW={{ base: "7xl" }}
                  px={{ base: 4, sm: 6, lg: 8 }}
                  mt={{ base: 12, md: 16, lg: 20, xl: 28 }}
                >
                  <Box
                    textAlign="center"
                    w={{ base: "full", md: 11 / 12, xl: 8 / 12 }}
                    mx="auto"
                  >
                    <chakra.h1
                      fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                      letterSpacing="tight"
                      lineHeight="short"
                      fontWeight="extrabold"
                      color="white"
                    >
                      <chakra.span display={{ base: "block", xl: "inline" }}>
                        Break Language Barriers with{" "}
                      </chakra.span>
                      <chakra.span
                        display={{ base: "block", xl: "inline" }}
                        color="twitter.100"
                      >
                        DeepEducation
                      </chakra.span>
                    </chakra.h1>
                    <chakra.p
                      mt={{ base: 3, sm: 5, md: 8 }}
                      mx={12}
                      mb={10}
                      fontSize={{ base: "lg", md: "xl" }}
                      color="facebook.100"
                      lineHeight="base"
                    >
                      An educational platform that uses artificial intelligence
                      to translate video content to increase educational equity
                      and accessibility.
                    </chakra.p>
                    <Stack
                      direction={{ base: "column", sm: "column", md: "row" }}
                      mb={{ base: 4, md: 8 }}
                      spacing={{ base: 4, md: 2 }}
                      justifyContent="center"
                    >
                      <Button
                        size="md"
                        variant="ghost"
                        bgGradient="linear(to-r, blue.100, blue.300)"
                        onClick={goToLogin}
                      >
                        Start Your Learning Journey
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <br />
        <br />
        <Text
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
          textAlign="center"
        >
          Features
        </Text>
        <Flex p={20} w="auto" justifyContent="center" alignItems="center">
          <Box
            shadow="3xl"
            px={8}
            py={20}
            mx="auto"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            rounded="lg"
          >
            <SimpleGrid
              alignItems="center"
              columns={{ base: 1, lg: 3 }}
              spacingY={{ base: 10, lg: 32 }}
              spacingX={{ base: 10, lg: 24 }}
            >
              <Box alignSelf="start" color="white">
                <chakra.h2
                  fontWeight="semibold"
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  A Universal Platform
                </chakra.h2>
                <chakra.h2
                  mb={3}
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="extrabold"
                  textAlign={{ base: "center", sm: "left" }}
                  lineHeight="shorter"
                  letterSpacing="tight"
                >
                  Translate Lectures Instantly
                </chakra.h2>
                <chakra.p
                  mb={6}
                  fontSize={{ base: "lg", md: "xl" }}
                  textAlign={{ base: "center", sm: "left" }}
                >
                  DeepEducation breaks language barriers by allowing learners to
                  translate online educational videos into any language.
                </chakra.p>
              </Box>
              <GridItem colSpan={2} color="white">
                <Stack
                  spacing={{ base: 10, md: 0 }}
                  display={{ md: "grid" }}
                  gridTemplateColumns={{ md: "repeat(2,1fr)" }}
                  gridColumnGap={{ md: 8 }}
                  gridRowGap={{ md: 10 }}
                >
                  <Feature title="Translate Rapidly">
                    Our Google Cloud Machine Learning backend enables users to
                    translate their lecture videos in under a minute ⏱{" "}
                  </Feature>
                  <Feature title="Personal Security">
                    Login instantaneously using Google, Facebook, GitHub, or
                    your email. We will never share any user data with
                    third-party services 🔒
                  </Feature>
                  <Feature title="Expand Your Educational Experience">
                    {" "}
                    Our amazing platform allows users to gain access to millions
                    of new educational videos. Learn about new cultures, ideas,
                    and concepts by translating content to your preferred
                    language 🗣
                  </Feature>
                  <Feature title="Take Notes on Important Concepts">
                    {" "}
                    DeepEducation allows users to take notes and summarize video
                    transcripts to provide an efficient educational experience
                    ✍️{" "}
                  </Feature>
                  <Feature title="Accessibility">
                    {" "}
                    Translate educational videos in over 40 languages and
                    generate translated transcripts to easily follow along. Additionally,
                    our DeepDub feature uses a neural network for face manipulation, making the videos
                    much more natural 📚
                  </Feature>
                  <Feature title="Organize Your Learning Journey">
                    {" "}
                    Our user-friendly platform allows learners to categorize
                    their notes and develop notes for each of their translated
                    videos 📝{" "}
                  </Feature>
                </Stack>
              </GridItem>
            </SimpleGrid>
          </Box>
        </Flex>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
};
