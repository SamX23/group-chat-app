import { createMuiTheme } from "@material-ui/core/styles";

export const primary = {
  primary: "white",
};

export const secondary = {
  secondary: "black",
};

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        margin: 0,
        body: {
          WebkitFontSmoothing: "auto",
        },
      },
    },
  },
});
