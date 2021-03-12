import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Input, Button, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import EmojiPicker from "../../globals/EmojiPicker";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "62px",

      "& > .MuiSvgIcon-root": {
        margin: "10px",
        color: "gray",
      },
    },

    form: {
      flex: 1,
      display: "flex",
      paddingRight: "20px",

      "& .MuiInput-root": {
        flex: 1,
        border: "none",
        padding: "10px",
      },

      "& > button": {
        display: "none",
      },
    },
  })
);

const RoomInput = ({ db, roomId, user }) => {
  const classes = useStyles();
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
    <Box className={classes.root}>
      <EmojiPicker addEmoji={addEmoji} />

      <form className={classes.form}>
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
