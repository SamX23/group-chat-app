import { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import db from "../../firebase";

const SidebarChat = ({ id, name }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="sidebarChat">
      <Link to={`/rooms/${id}`}>
        <div className="sidebarChat__container">
          <Avatar
            src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
            alt="Group Avatar"
          />
          <div className="sidebarChat__info">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

SidebarChat.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
};

export default SidebarChat;
