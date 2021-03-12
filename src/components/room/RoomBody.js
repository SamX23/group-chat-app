import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import MessageFormatter from "../../globals/MessageFormatter";

const RoomBody = ({ messages, showDate, user }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const ChatMessages = () =>
    messages.map((message) => (
      <p
        key={`${message.name}-${message.timestamp}`}
        className={`chat__message ${message.uid === user.uid && "chat__users"}`}
      >
        <span
          className={`chat__name chat__property ${
            message.uid === user.uid && "chat__senderProperty"
          }`}
        >
          {message.name}
        </span>
        {message.message}
        <span
          className={`chat__timestamp chat__property ${
            message.uid === user.uid && "chat__senderProperty"
          }`}
        >
          {showDate(message)}
        </span>
      </p>
    ));

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="room__body">
      <MessageFormatter>
        <ChatMessages />
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
