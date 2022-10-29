import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import db from "../../../firebase";
import { useStateValue } from "../../../store/StateProvider";
import RoomHeader from "./RoomHeader";
import RoomBody from "./RoomBody";
import RoomInput from "./RoomInput";

export default function Room() {
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  const { roomId } = useParams([]);
  const timeSource = (message) => message.timestamp?.toDate();

  const showDate = (message) => {
    if (moment(timeSource(message)).fromNow() > moment().calendar()) {
      return moment(timeSource(message)).fromNow();
    }
    return moment(timeSource(message)).calendar();
  };

  const getRoomById = db.collection("rooms").doc(roomId);

  const getRooms = async (isMounted) =>
    getRoomById.onSnapshot((snapshot) => {
      if (isMounted) return setRoomName(snapshot.data().name);
      return null;
    });

  const getMessages = async (isMounted) =>
    getRoomById
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        if (isMounted) setMessages(snapshot.docs.map((doc) => doc.data()));
      });

  useEffect(() => {
    let isMounted = true;

    if (user && roomId) {
      getRooms(isMounted).then(() => {
        setSeed(Math.floor(Math.random() * 5000));
        getMessages(isMounted);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [roomId]);

  return (
    <div className="room">
      <RoomHeader
        db={db}
        user={user}
        seed={seed}
        messages={messages}
        roomName={roomName}
        roomId={roomId}
        showDate={showDate}
      />

      <RoomBody messages={messages} showDate={showDate} user={user} />

      <RoomInput db={db} roomId={roomId} user={user} />
    </div>
  );
}
