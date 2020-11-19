import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../client/constants/theme";
import "../client/base.css";
import { useState } from "react";

const MyApp = ({ Component, pageProps }) => {
  const [activeTheme, setActiveTheme] = useState({
    ...theme,
    palette: { ...theme.palette, type: "light" },
  });
  const togglePaletteType = () => {
    console.log("toggle");
    setActiveTheme({
      ...theme,
      palette: {
        ...theme.palette,
        type: activeTheme.palette.type === "light" ? "dark" : "light",
      },
    });
  };

  return (
    <ThemeProvider theme={{ ...activeTheme, togglePaletteType }}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
