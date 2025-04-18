import { Outlet } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Outlet />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default App;
