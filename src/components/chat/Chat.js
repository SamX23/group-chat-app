import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import db from "../../firebase";
import { useStateValue } from "../../store/StateProvider";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";

export default function Chat() {
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  const { roomId } = useParams([]);
  const timeSource = (message) => message.timestamp?.toDate();
  const showDate = () => {
    if (moment(timeSource).fromNow() > moment().calendar()) {
      return moment(timeSource).fromNow();
    }
    return moment(timeSource).calendar();
  };

  useEffect(() => {
    let isMounted = true;
    if (user && roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          if (isMounted) {
            return snapshot.data() && setRoomName(snapshot.data().name);
          }
          return null;
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

  return (
    <div className="chat">
      <ChatHeader
        db={db}
        user={user}
        seed={seed}
        messages={messages}
        roomName={roomName}
        roomId={roomId}
        showDate={showDate}
      />

      <ChatBody messages={messages} showDate={showDate} user={user} />

      <ChatInput db={db} roomId={roomId} user={user} />
    </div>
  );
}
