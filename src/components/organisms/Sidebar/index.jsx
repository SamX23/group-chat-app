import { lazy, Suspense, useEffect, useState } from "react";
import db from "../../../firebase";
import Loading from "../../atoms/Loading";
import SidebarHeader from "./SidebarHeader";

const SidebarRoom = lazy(() => import("./SidebarRoom"));

export default function Sidebar() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    let isMounted = true;

    db.collection("rooms")
      .orderBy("datecreated", "desc")
      .onSnapshot(
        (snapshot) =>
          isMounted &&
          setRooms(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
      );

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="sidebar">
      <SidebarHeader />
      <Suspense fallback={<Loading />}>
        <div className="sidebar__rooms">
          {rooms.map((room) => (
            <SidebarRoom key={room.id} id={room.id} name={room.data.name} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
