import { makeStyles } from "@material-ui/core/styles";

export const GlobalStyles = makeStyles({
  "@global": {
    margin: 0,
    body: {
      WebkitFontSmoothing: antialiased,
      MozOsxFontSmoothing: grayscale,
    },
  },
});
