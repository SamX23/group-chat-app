import React, { lazy, Suspense, useEffect, useState } from "react";
import db from "../firebase";

import Loading from "./animations/Loading";

const SidebarHeader = lazy(() => import("./SidebarHeader"));
const SidebarChat = lazy(() => import("./SidebarChat"));

export default function Sidebar() {
  const [rooms, setRooms] = useState([]);

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

  return (
    <div className="sidebar">
      <SidebarHeader />

      <Suspense fallback={<Loading />}>
        <div className="sidebar__chats">
          {rooms.map((room) => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
