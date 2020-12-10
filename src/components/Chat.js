import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../store/StateProvider";
import moment from "moment";
import db from "../firebase";
import firebase from "firebase";
import MessageFormatter from "./MessageFormatter";
import { InsertEmoticon } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import ChatHeader from "./ChatHeader";

export default function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  const { roomId } = useParams([]);

  // Everytime chat.js loaded, it will the roomId into name from snapshot based on roomId
  useEffect(() => {
    let isMounted = true;
    if (user && roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          if (isMounted) snapshot.data() && setRoomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          if (isMounted) setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      isMounted = false;
    };
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

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

  const showDate = (message) => {
    let source = message.timestamp?.toDate();
    if (moment(source).fromNow() > moment().calendar()) {
      return moment(source).fromNow();
    } else {
      return moment(source).calendar();
    }
  };

  return (
    <div className="chat">
      <ChatHeader
        seed={seed}
        messages={messages}
        roomName={roomName}
        roomId={roomId}
      />
      <div className="chat__body">
        <MessageFormatter>
          {messages.map((message) => (
            <p
              key={`${message.name}-${message.timestamp}`}
              className={`chat__message ${
                message.uid === user.uid && "chat__receiver"
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                {/* Simplest method handling timestamp on firebase */}
                {showDate(message)}
              </span>
            </p>
          ))}
        </MessageFormatter>
      </div>
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
    </div>
  );
}
