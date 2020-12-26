import { useState } from "react";
import firebase from "firebase";
import {
  createStyles,
  styled,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import { InsertEmoticon } from "@material-ui/icons";
import { IconButton, Input, FormControl, Button, Box } from "@material-ui/core";

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
  const [input, setInput] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        message: input,
        name: user.displayName,
        uid: user.uid,
        // global (server) timestamp
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((e) => console.error("Error writing document: ", e));

    db.collection("rooms")
      .doc(roomId)
      .update({
        datecreated: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((e) => console.error("Error writing document: ", e));

    setInput("");
  };

  return (
    <Box className={classes.root}>
      <IconButton aria-label="insert emoticon">
        <InsertEmoticon />
      </IconButton>
      {/* <Picker onSelect={this.addEmoji} /> */}
      <form className={classes.form}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
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

export default ChatInput;
