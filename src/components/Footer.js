import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { styled } from "@material-ui/core/styles";

export default function Footer() {
  const FooterBar = styled(Box)({
    position: "fixed",
    left: 0,
    bottom: 5,
    width: "100%",
    textAlign: "center",
    padding: "5px",
    "& a": {
      color: "#0400ff",
      textDecoration: "none",
    },
  });

  return (
    <FooterBar>
      <Typography variant="body1">
        Made with{" "}
        <span role="img" aria-label="love">
          ♥️
        </span>{" "}
        by
        <Link href="https://samx23.github.io"> Sami Kalammallah</Link> ©{" "}
        {new Date().getFullYear()}
      </Typography>
    </FooterBar>
  );
}
