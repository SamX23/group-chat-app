import { useState } from "react";
import { useHistory } from "react-router-dom";
import db from "../firebase";
import { MoreVert, SearchOutlined } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

function ChatHeader({ messages, roomName, roomId, seed }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const toggleOption = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteChat = (id) => {
    let deleteConfirmation = window.confirm("Are you Sure ?");
    if (deleteConfirmation) {
      db.collection("rooms")
        .doc(id)
        .delete()
        .then(() => history.push("/"))
        .catch((e) => console.error("Error removing document: ", e));
    }
  };

  return (
    <div className="chat__header">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="chat__headerInfo">
        <h3>{roomName}</h3>
        {messages.length > 0 && (
          <p>
            Last update{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toLocaleString()}
          </p>
        )}
      </div>
      <div className="chat__headerMenu">
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <IconButton
          aria-controls="option-menu"
          aria-haspopup="true"
          className="sidebar__option"
          onClick={toggleOption}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="option-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => deleteChat(roomId)}>Delete Room</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default ChatHeader;
