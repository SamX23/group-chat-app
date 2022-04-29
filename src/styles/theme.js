import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

/* 
Color scheme
#d8e3e7
#51c4d3
#126e82
#132c33
*/

const theme = createTheme({
  palette: {
    primary: {
      main: "#d8e3e7",
    },
    secondary: {
      main: "#51c4d3",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
