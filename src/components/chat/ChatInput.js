import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { InsertEmoticon } from "@material-ui/icons";
import { Popover, IconButton, Input, Button, Box } from "@material-ui/core";
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
  const [showPicker, setShowpicker] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const sendMessage = (event) => {
    event.preventDefault();
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

    db.collection("rooms")
      .doc(roomId)
      .update({
        datecreated: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((err) => console.error("Error writing document: ", err));

    setMessage("");
  };

  const handleClick = (event) => {
    event.preventDefault();
    setShowpicker(!showPicker);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addEmoji = (emoji) => {
    setMessage(message + emoji.native);
  };

  const open = Boolean(anchorEl);
  const id = open ? "emoticon-popover" : undefined;

  return (
    <Box className={classes.root}>
      <IconButton aria-label="insert emoticon" onClick={handleClick}>
        <InsertEmoticon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Picker showPreview={false} showSkinTones={false} onSelect={addEmoji} />
      </Popover>

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
