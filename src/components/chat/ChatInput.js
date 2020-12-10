import { useState } from "react";
import firebase from "firebase";
import { InsertEmoticon } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

const ChatInput = ({ db, roomId, user }) => {
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
    <div className="chat__input">
      <IconButton>
        <InsertEmoticon />
      </IconButton>
      {/* <Picker onSelect={this.addEmoji} /> */}
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          type="text"
        />
        <button onClick={sendMessage} type="submit">
          Send a message
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
