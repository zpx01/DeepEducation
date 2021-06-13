import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Center,
} from "@chakra-ui/react";
import { LionPlayer } from "lion-player";

export const VideoModal = ({ video, title, transcript, summary }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} colorScheme="facebook" variant="solid">
        Video
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LionPlayer src={video} fluid={true} />
            <br />
            <br />
            <Center>
              <Text fontWeight="extrabold" fontSize="xl">
                Video Summary
              </Text>
            </Center>
            <br />
            {summary}
            <Center>
              <br />
              <br />
              <Text fontWeight="extrabold" fontSize="xl">
                Video Transcript
              </Text>
            </Center>
            <br />
            {transcript}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
