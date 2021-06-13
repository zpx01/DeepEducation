import { useState } from "react";
import { Text, Textarea, Button } from "@chakra-ui/react";
import axios from "axios";
import { Card } from "./Card";
import firebase from "firebase";

export const AddPost = () => {
  let [value, setValue] = useState("");

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  let submitPost = (e) => {
    let postText = {
      header: "Access-Control-Allow-Origin",
      email: firebase.auth().currentUser.email,
      text: value,
    };
    axios.post("http://localhost:5000/add-post", postText).then((res) => {
      console.log(res)
    })
  };
  return (
    <>
      <Card>
        <Text mb="8px">Post: {value}</Text>
        <Textarea
          value={value}
          onChange={handleInputChange}
          placeholder="Enter your thoughts."
          colorScheme="teal"
          size="sm"
          variant="filled"
        />
        <br />
        <br />
        <Button onClick={submitPost} colorScheme="teal" size="md">
          Submit
        </Button>
      </Card>
    </>
  );
};
