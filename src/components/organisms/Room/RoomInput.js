import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { Input, Button, Box } from "@mui/material";
import PropTypes from "prop-types";
import EmojiPicker from "../../atoms/EmojiPicker";

const RoomInput = ({ db, roomId, user }) => {
  const [message, setMessage] = useState("");

  const addEmoji = (emoji) => {
    setMessage(message + emoji.native);
  };

  const createMessage = () => {
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        message,
        name: user.displayName,
        uid: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((err) => console.error("Error writing document: ", err));
  };

  const updateTime = () => {
    db.collection("rooms")
      .doc(roomId)
      .update({
        datecreated: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((err) => console.error("Error writing document: ", err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createMessage();
    updateTime();

    setMessage("");
  };

  return (
    <Box className="room__input">
      <EmojiPicker addEmoji={addEmoji} />

      <form>
        <Input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type a message"
          inputProps={{ "aria-label": "description" }}
          type="text"
        />
        <Button onClick={handleSubmit} type="submit">
          Send a message
        </Button>
      </form>
    </Box>
  );
};

RoomInput.propTypes = {
  db: PropTypes.objectOf(PropTypes.any),
  roomId: PropTypes.string,
  user: PropTypes.objectOf(PropTypes.any),
};

export default RoomInput;
