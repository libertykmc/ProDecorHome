import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", //dark
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
