import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { Flex } from "@chakra-ui/layout";
import { Button, Link } from "@chakra-ui/react";
import { VideoModal } from "./VideoModal";
import { useState, useEffect } from "react";
import axios from "axios";
import firebase from "firebase";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Text,
  Heading,
} from "@chakra-ui/react";
import { chakra, Icon } from "@chakra-ui/react";

import { BsLightningFill } from "react-icons/bs";
import { NotesModal } from "./NotesModal";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 500,
//   },
// });

const bg1 = "gray.800";
const bg2 = "red.400";
const bg3 = "gray.200";

export const VideoTable = ({ videos }) => {
  let [posts, setPosts] = useState([]);
  let [dates, setDates] = useState([]);
  let [currentLikes, setCurrentLikes] = useState([]);
  let [currentVideos, setCurrentVideos] = useState([]);
  let [categories, setCategories] = useState([]);
  let [videoTitles, setVideoTitles] = useState([]);
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
            setVideoTitles(data.data[4].reverse());
            setCurrentVideos(data.data[5].reverse());
          });
        }
      );
    });
  }, []);

  let videoNotePairs = [];
  for (let i = 0; i < posts.length; i++) {
    let x = [
      posts[i],
      dates[i],
      currentLikes[i],
      categories[i],
      videoTitles[i],
    ];
    videoNotePairs.push(x);
  }
  if (videos.length > 0) {
    return (
      <Box bgColor="white">
        <Table variant="striped" colorScheme="linkedin">
          <Thead>
            <Tr>
              <Th>
                <Text fontSize="md" fontWeight="bold">
                  Video Title
                </Text>
              </Th>
              <Th>
                <Text fontSize="md" fontWeight="bold">
                  Original Video
                </Text>
              </Th>
              <Th>
                <Text fontSize="md" fontWeight="bold">
                  Translated Video
                </Text>
              </Th>
              <Th>
                <Text fontSize="md" fontWeight="bold">
                  Notes
                </Text>
              </Th>
              <Th>
                <Text fontSize="md" fontWeight="bold">
                  Date
                </Text>
              </Th>
            </Tr>
          </Thead>
          {videos.map((video) => (
            <Tbody>
              <Tr>
                <Td>{video[0]}</Td>
                <Td>
                  <Link href={video[1]} isExternal={true}>
                    <Button colorScheme="facebook" variant="solid">
                      View Video
                    </Button>
                  </Link>
                </Td>
                <Td>
                  <VideoModal
                    video={video[2]}
                    title={video[0]}
                    transcript={video[3]}
                    summary={video[5]}
                  />
                </Td>
                <Td>
                  <NotesModal groups={videoNotePairs} videoTitle={video[0]} />
                </Td>
                <Td>{video[4]}</Td>
              </Tr>
            </Tbody>
          ))}
        </Table>
      </Box>
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
              No Videos 😕
            </chakra.span>
            <chakra.p color={bg3} fontSize="sm">
              You haven't translated any videos yet!
            </chakra.p>
          </Box>
        </Box>
      </Flex>
    );
  }
};

export default VideoTable;

//   const classes = useStyles();

//   return (
//     <Flex bgColor="messenger.200">
//       <TableContainer component={Paper}>
//         <Table className={classes.table} aria-label="simple table" bgColor="#b5def7">
//           <TableHead>
//             <TableRow>
//               <TableCell>Video&nbsp;Title</TableCell>
//               <TableCell align="right">Original&nbsp;Video</TableCell>
//               <TableCell align="right">Translated&nbsp;Video</TableCell>
//               <TableCell align="right">Date</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {videos.map((video) => (
//               <TableRow key={video[0]}>
//                 <TableCell component="th" scope="row">
//                   {video[0]}
//                 </TableCell>
//                 <TableCell align="right">
//                   <Link href={video[1]} isExternal={true}>
//                     <Button colorScheme="messenger" variant="outline">
//                       View Video
//                     </Button>
//                   </Link>
//                 </TableCell>
//                 <TableCell align="right">
//                     <VideoModal video={video[2]} title={video[0]} transcript={video[3]}/>
//                 </TableCell>
//                 <TableCell align="right">{video[4]}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Flex>
//   );
// };

// import {
//   Table,
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
// } from "@chakra-ui/react";

// <Table variant="striped" colorScheme="teal">
//   <Thead>
//     <Tr>
//       <Th>Video Title</Th>
//       <Th>Original Video</Th>
//       <Th>Translated Video</Th>
//       <Th>Date</Th>
//     </Tr>
//   </Thead>
//   {videos.map((video) => (
//     <Tbody>
//       <Tr>
//         <Td>{video[0]}</Td>
//       </Tr>
//       <Tr>
//         <Td>
//           <Link href={video[1]} isExternal={true}>
//             <Button colorScheme="messenger" variant="outline">
//               View Video
//             </Button>
//           </Link>
//         </Td>
//       </Tr>
//       <Tr>
//         <Td>
//           <VideoModal video={video[2]} title={video[0]} transcript={video[3]} />
//         </Td>
//       </Tr>
//       <Tr>
//         <Td>
//           <TableCell align="right">{video[4]}</TableCell>
//         </Td>
//       </Tr>
//     </Tbody>
//   ))}
// </Table>
