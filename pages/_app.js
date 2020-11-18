import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../client/constants/theme";
import "../client/base.css";

const MyApp = ({ Component, pageProps }, other) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
