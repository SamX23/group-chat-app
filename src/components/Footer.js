import React from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { styled } from "@material-ui/core/styles";

export default function Footer() {
  const Footer = styled(Box)({
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    textAlign: "center",
    padding: "5px",
    backgroundColor: "#c1beba",
    "& a": {
      color: "rgb(253, 69, 69)",
      textDecoration: "none",
    },
  });

  return (
    <Footer>
      <Typography variant="body1">
        Made with{" "}
        <span role="img" aria-label="love">
          ♥️
        </span>{" "}
        by
        <Link href="https://samx23.github.io"> Sami Kalammallah</Link> ©{" "}
        {new Date().getFullYear()}
      </Typography>
    </Footer>
  );
}
