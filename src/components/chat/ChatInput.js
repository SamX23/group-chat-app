import { useState } from "react";
import { firestore } from "firebase";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { InsertEmoticon } from "@material-ui/icons";
import { IconButton, Input, Button, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

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

const ChatInput = ({ db, roomId, user }) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [emojiState, setEmojiState] = useState(false);

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        message,
        name: user.displayName,
        uid: user.uid,
        timestamp: firestore.FieldValue.serverTimestamp(),
      })
      .catch((err) => console.error("Error writing document: ", err));

    db.collection("rooms")
      .doc(roomId)
      .update({
        datecreated: firestore.FieldValue.serverTimestamp(),
      })
      .catch((err) => console.error("Error writing document: ", err));

    setMessage("");
    setEmojiState(false);
  };

  const showPicker = (event) => {
    event.preventDefault();
    setEmojiState(!emojiState);
  };

  const addEmoji = (emoji) => {
    setMessage(message + emoji.native);
  };

  return (
    <Box className={classes.root}>
      <IconButton aria-label="insert emoticon" onClick={showPicker}>
        <InsertEmoticon />
      </IconButton>

      {emojiState && (
        <span className="chat__emojiPicker">
          <Picker
            showPreview={false}
            showSkinTones={false}
            onSelect={addEmoji}
          />
        </span>
      )}

      <form className={classes.form}>
        <Input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type a message"
          inputProps={{ "aria-label": "description" }}
          type="text"
        />
        <Button onClick={sendMessage} type="submit">
          Send a message
        </Button>
      </form>
    </Box>
  );
};

ChatInput.propTypes = {
  db: PropTypes.objectOf(PropTypes.any),
  roomId: PropTypes.string,
  user: PropTypes.objectOf(PropTypes.any),
};

export default ChatInput;
