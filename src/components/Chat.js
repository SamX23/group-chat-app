import { Avatar } from "@material-ui/core";
import React from "react";

function Chat() {
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
      </div>
      <div className="chat__body"></div>
      <div className="chat__footer"></div>
    </div>
  );
}

export default Chat;
