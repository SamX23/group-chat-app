import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../StateProvider";

import db from "../firebase";
import firebase from "firebase";

function Chat() {
  // Its like setter and getter to push and pull data from StateProvider
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();

  const { roomId } = useParams([]);

  // Everytime chat.js loaded, it will the roomId into name from snapshot based on roomId
  useEffect(() => {
    // unsubscribe return is used in order to make the useEffect not always running
    const unsubscribe = () => {
      if (roomId) {
        db.collection("rooms")
          .doc(roomId)
          .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

        db.collection("rooms")
          .doc(roomId)
          .collection("messages")
          .orderBy("timestamp", "asc")
          .onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc) => doc.data()))
          );
      }
      setInput("");
    };

    return unsubscribe;
    // trigger that also changes
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    // Prevent refresh when hit the enter
    e.preventDefault();
    console.log("Typed: ", input);

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

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last update
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {/* Simplest method handling timestamp on firebase */}
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
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
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
