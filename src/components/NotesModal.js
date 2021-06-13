import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Post } from "./Post";

export const NotesModal = ({ groups, videoTitle }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let posts = [];
  for (let i = 0; i < groups.length; i++) {
    if (groups[i][4] === videoTitle) {
      posts.push([groups[i][0], groups[i][1], groups[i][2], groups[i][3]]);
    }
  }
  const btnRef = React.useRef();
  return (
    <>
      <Button onClick={onOpen} colorScheme="facebook" variant="solid">
        Open Notes
      </Button>

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {posts.map((post) => (
              <Post post={post} />
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
