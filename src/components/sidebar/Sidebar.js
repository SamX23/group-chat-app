import { lazy, Suspense, useEffect, useState } from "react";
import db from "../../firebase";
import Loading from "../animations/Loading";

const SidebarChat = lazy(() => import("./SidebarChat"));
const SidebarHeader = lazy(() => import("./SidebarHeader"));

export default function Sidebar() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    try {
      const susbcribe = db
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
      return susbcribe;
    } catch (e) {
      console.log(e);
    }
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
