import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useStateValue } from "../store/StateProvider";
import db from "../firebase";
import firebase from "firebase";
import { InsertEmoticon, MoreVert, SearchOutlined } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  const [anchorEl, setAnchorEl] = useState(null);
  const { roomId } = useParams([]);
  const history = useHistory();

  // Everytime chat.js loaded, it will the roomId into name from snapshot based on roomId
  useEffect(() => {
    let isMounted = true;
    if (roomId) {
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
        // user and displayname is from google login
        name: user.displayName,
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

  const today = new Date().toLocaleString();
  const showDate = (message) => {
    const date = new Date(message.timestamp?.toDate()).toLocaleString();
    if (date === today) {
      return "recently";
    } else {
      return date;
    }
  };

  const toggleOption = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteChat = (id) => {
    let deleteConfirmation = window.confirm("Are you Sure ?");
    if (deleteConfirmation) {
      db.collection("rooms")
        .doc(id)
        .delete()
        .then(() => history.push("/"))
        .catch((e) => console.error("Error removing document: ", e));
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
          <IconButton
            aria-controls="option-menu"
            aria-haspopup="true"
            className="sidebar__option"
            onClick={toggleOption}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id="option-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => deleteChat(roomId)}>Delete Room</MenuItem>
          </Menu>
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
