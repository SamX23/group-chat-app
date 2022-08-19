import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Footer() {
  return (
    <Box
      sx={{ p: "5px", position: "fixed", left: 0, bottom: 5, width: "100%" }}
      textAlign="center"
    >
      <Typography variant="h6" color="primary">
        Truly developed with{" "}
        <span role="img" aria-label="love">
          ♥️
        </span>{" "}
        by{" "}
        <Link
          underline="none"
          color="secondary"
          href="https://samx23.github.io"
        >
          Sami Kalammallah
        </Link>{" "}
        © {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}
