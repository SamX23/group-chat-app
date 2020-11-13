import React, { useState } from "react";
import { useStateValue } from "../store/StateProvider";
import { Link } from "react-router-dom";
import db from "../firebase";
import { auth } from "../firebase";
import firebase from "firebase";

import { Chat as ChatIcon, MoreVert, SearchOutlined } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";

function SidebarHeader({}) {
  const [{ user }] = useStateValue();
  const [open, setOpen] = useState(false);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat room");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
        datecreated: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  const toggleOption = () => {
    let actionToggle = document.querySelector(".option");
    actionToggle.classList.toggle("active");
  };

  const logout = () => {
    if (user) {
      auth.signOut().then(() => localStorage.removeItem("user"));
    }
  };

  return (
    <div className="sidebar__header">
      <div className="sidebar__headerMenu">
        <Link to="/">
          <Avatar src={user?.photoURL} />
        </Link>
        <div className="sidebar__headerRight">
          <IconButton onClick={createChat}>
            <ChatIcon />
          </IconButton>
          <IconButton className="sidebar__option" onClick={toggleOption}>
            <MoreVert />
            <ul className="option">
              <li>
                <img
                  src="https://img.icons8.com/fluent-systems-regular/30/000000/settings.png"
                  alt="setting icon"
                />
                Settings
                <a href="#" onClick={() => setOpen(!open)}>
                  Click
                </a>
              </li>
              <li onClick={logout}>
                <img
                  src="https://img.icons8.com/windows/32/000000/exit.png"
                  alt="logout icon"
                />
                Sign Out
              </li>
            </ul>
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
    </div>
  );
}

export default SidebarHeader;
