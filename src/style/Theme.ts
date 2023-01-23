import { createTheme } from "@mui/material";
import { ColorPalette } from "./ColorPalette";

const theme = createTheme({
  palette: {
    primary: {
      main: ColorPalette.PRIMARY
    },
    secondary: {
      main: ColorPalette.SECONDARY
    },
  },
});

export default theme;
