import React, { lazy, Suspense, useEffect, useState } from "react";
import { useStateValue } from "../store/StateProvider";
import { auth } from "../firebase";

import { Avatar, IconButton } from "@material-ui/core";
import {
  Chat as ChatIcon,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";

import db from "../firebase";
import firebase from "firebase";
import { Link } from "react-router-dom";

const SidebarChat = lazy(() => import("./SidebarChat"));

export default function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();

  // Everytime sidebar.js loaded, it will setRooms from snapshot
  useEffect(() => {
    const unsubscribe = db
      .collection("rooms")
      .orderBy("datecreated", "desc")
      .onSnapshot((snapshot) => {
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

    return () => {
      unsubscribe();
    };
  }, []);

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
    <div className="sidebar">
      <div className="sidebar__header">
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

      <Suspense fallback={<div>Loading ...</div>}>
        <div className="sidebar__chats">
          {rooms.map((room) => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
