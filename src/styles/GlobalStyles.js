import { createMuiTheme } from "@material-ui/core/styles";

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
