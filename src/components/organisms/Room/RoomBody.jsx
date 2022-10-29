import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import MessageFormatter from "../../../utility/MessageFormatter";
import RoomMessage from "./RoomMessage";

const RoomBody = ({ messages, showDate, user }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => scrollToBottom(), [messages]);

  return (
    <div className="room__body">
      <MessageFormatter>
        {messages.map((message) => (
          <RoomMessage
            key={message.uid}
            message={message}
            showDate={showDate}
            user={user}
          />
        ))}
      </MessageFormatter>
      <div ref={messagesEndRef} />
    </div>
  );
};

RoomBody.propTypes = {
  messages: PropTypes.instanceOf(Array),
  showDate: PropTypes.func,
  user: PropTypes.objectOf(PropTypes.any),
};

export default RoomBody;
