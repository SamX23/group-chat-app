import PropTypes from "prop-types";

const RoomMessage = ({ message, showDate, user }) => (
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
);

RoomMessage.propTypes = {
  message: PropTypes.instanceOf(Array),
  showDate: PropTypes.func,
  user: PropTypes.objectOf(PropTypes.any),
};

export default RoomMessage;
