import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      success: object;
      warning: object;
    };
    customColor: {
      secondary: object;
    };
  }
  interface ThemeOptions {
    status?: {
      success?: object;
      warning?: object;
    };
    customColor: {
      secondary: object;
    };
  }
}

const Theme = createTheme({
  status: {
    success: {
      color: "rgba(84, 214, 44, 0.16)",
      textContrast: "rgb(34, 154, 22)",
    },
    warning: {
      color: "rgba(255, 193, 7, 0.16)",
      textContrast: "rgb(183, 129, 3)",
    },
  },
  customColor: {
    secondary: {
      color: "rgba(0, 0, 0, 0.53)",
    },
  },
  palette: {
    primary: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "#ffffff",
      // contrastText: "rgb(2, 136, 209)",
    },
    secondary: {
      light: "#fffadd",
      main: "#f5d312",
      dark: "#e7c400",
      // contrastText: "rgb(2, 136, 209)",
    },
    success: {
      main: "rgb(34, 154, 22)",
      light: "rgba(84, 214, 44, 0.16)",
      dark: "#1b5e20",
      // contrastText: "rgb(34, 154, 22)",
    },
    warning: {
      main: "rgb(183, 129, 3)",
      light: "rgba(255, 193, 7, 0.16)",
      dark: "#e65100",
      // contrastText: "rgb(183, 129, 3)"
    },
    error: {
      main: "rgb(183, 33, 54)",
      light: "rgba(255, 72, 66, 0.16)",
      dark: "#c62828",
      // contrastText: "rgb(183, 33, 54)",
    },
    info: {
      main: "rgb(2, 136, 209)",
      light: "rgb(2, 136, 209, 0.16)",
      dark: "#01579b",
      // contrastText: "rgb(2, 136, 209)",
    },
  },
  typography: {
    fontSize: 16,
    fontFamily: "'Varela Round', sans-serif",
  },
});

export default Theme;
