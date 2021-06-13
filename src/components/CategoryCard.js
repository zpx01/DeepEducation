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
    useDisclosure,
    Logo
  } from "@chakra-ui/react";


export const CategoryCard = ({title, text, image}) => {
    return (
    //   <Flex
    //     bg={useColorModeValue("#F9FAFB", "gray.600")}
    //     p={50}
    //     w="full"
    //     alignItems="center"
    //     justifyContent="center"
    //   >
        <Box
          mx="auto"
          rounded="lg"
          shadow="md"
          bg={useColorModeValue("white", "gray.800")}
          maxW="md"
        >
          <Image
            roundedTop="lg"
            w="full"
            h={64}
            fit="cover"
            src={image}
          />
  
          <Box p={5}>
            <Box>
            <Center>
              <Text fontSize="2xl" fontWeight="extrabold" textAlign="center">
                {title}
              </Text>
            </Center>
              <chakra.p
                mt={2}
                fontSize="sm"
                textAlign="center"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {text}
              </chakra.p>
            </Box>
            <Box mt={6}>
            <Center>
              <Button
                bg="gray.900"
                color="gray.100"
                px={5}
                py={3}
                fontWeight="semibold"
                rounded="lg"
                _hover={{ bg: "gray.400" }}
              >
                Add to Feed
              </Button>
               </Center>
            </Box>
          </Box>
        </Box>
    //   </Flex>
    );
  };
  
  