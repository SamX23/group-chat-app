import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../store/StateProvider";

import { Avatar, IconButton } from "@material-ui/core";
import { InsertEmoticon, MoreVert, SearchOutlined } from "@material-ui/icons";

// import "emoji-mart/css/emoji-mart.css";
// import { Picker } from "emoji-mart";

import db from "../firebase";
import firebase from "firebase";

function Chat() {
  // Its like setter and getter to push and pull data from StateProvider
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();

  const { roomId } = useParams([]);

  // Everytime chat.js loaded, it will the roomId into name from snapshot based on roomId
  // a deleted name will be undefined after deletion, so add some handling here as a temporary solution
  // the proper solution will be update the list after deletion
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot(
          (snapshot) => snapshot.data() && setRoomName(snapshot.data().name)
        );

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
    setInput("");
    // trigger that also changes
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    // Prevent refresh when hit the enter
    e.preventDefault();

    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        message: input,
        // user and displayname is from google login
        name: user.displayName,
        // global (server) timestamp
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((e) => console.error("Error writing document: ", e));

    // Update timestamp
    db.collection("rooms")
      .doc(roomId)
      .update({
        datecreated: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((e) => console.error("Error writing document: ", e));

    // Clear text after enter clicked
    setInput("");
  };

  const today = new Date().toLocaleString();
  const showDate = (message) => {
    const date = new Date(message.timestamp?.toDate()).toLocaleString();
    if (date === today) {
      return "recently";
    } else {
      return date;
    }
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          {messages.length > 0 && (
            <p>
              Last update{" "}
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toLocaleString()}
            </p>
          )}
        </div>

        <div className="chat__headerMenu">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            key={`${message.name}-${message.timestamp}`}
            className={`chat__message ${
              message.name === user.displayName && "chat__receiver"
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

export default Chat;
