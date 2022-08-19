import { useState } from "react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { Popover, IconButton } from "@mui/material";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import PropTypes from "prop-types";

const EmojiPicker = ({ addEmoji }) => {
  const [showPicker, setShowpicker] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    event.preventDefault();
    setShowpicker(!showPicker);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "emoticon-popover" : undefined;

  return (
    <>
      <IconButton aria-label="insert emoticon" onClick={handleClick}>
        <InsertEmoticonIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Picker showPreview={false} showSkinTones={false} onSelect={addEmoji} />
      </Popover>
    </>
  );
};

EmojiPicker.propTypes = {
  addEmoji: PropTypes.func,
};

export default EmojiPicker;
