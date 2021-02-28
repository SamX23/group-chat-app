import PropTypes from "prop-types";
import MessageFormatter from "../MessageFormatter";

const ChatBody = ({ messages, showDate, user }) => (
  <div className="chat__body">
    <MessageFormatter>
      {messages.map((message) => (
        <p
          key={`${message.name}-${message.timestamp}`}
          className={`chat__message ${
            message.uid === user.uid && "chat__receiver"
          }`}
        >
          <span className="chat__name">{message.name}</span>
          {message.message}
          <span className="chat__timestamp">{showDate(message)}</span>
        </p>
      ))}
    </MessageFormatter>
  </div>
);

ChatBody.propTypes = {
  messages: PropTypes.instanceOf(Array),
  showDate: PropTypes.func,
  user: PropTypes.objectOf(PropTypes.any),
};

export default ChatBody;
