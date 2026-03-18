import { createTheme, type Theme } from "@mui/material/styles";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    sage: {
      lightest: string;
      light: string;
      main: string;
      dark: string;
    };
    custom: {
      navHover: string;
      sparkle: string;
      videoBoxShadow: string;
      borderLight: string;
    };
  }
  interface PaletteOptions {
    sage?: {
      lightest?: string;
      light?: string;
      main?: string;
      dark?: string;
    };
    custom?: {
      navHover?: string;
      sparkle?: string;
      videoBoxShadow?: string;
      borderLight?: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    background: {
      default: "#fbfff7",
      paper: "#f0f3ec",
    },
    primary: {
      main: "#50564a",
      light: "#c4ceba",
      dark: "#3a3e35",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#4a4a4a",
    },
    sage: {
      lightest: "#fbfff7",
      light: "#c4ceba",
      main: "#f0f3ec",
      dark: "#50564a",
    },
    custom: {
      navHover: "rgba(80, 86, 74, 0.08)",
      sparkle: "rgba(255, 255, 255, 0.8)",
      videoBoxShadow: "0 0 22px 47px rgba(0, 0, 0, 0.37)",
      borderLight: "rgba(0, 0, 0, 0.08)",
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontFamily: '"Kaisei Tokumin", serif',
      fontWeight: 400,
    },
    h2: {
      fontFamily: '"Kaisei Tokumin", serif',
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.8rem",
    },
    subtitle1: {
      textTransform: "uppercase",
      fontSize: "0.7rem",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: "100%",
        },
        body: ({ theme }: { theme: Theme }) => ({
          height: "100%",
          margin: 0,
          backgroundColor: theme.palette.background.default,
        }),
        "#root": {
          height: "100%",
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderBottom: `1px solid ${theme.palette.custom.borderLight}`,
        }),
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 0,
        },
      },
      variants: [
        {
          props: { variant: "primary" },
          style: ({ theme }) => ({
            fontSize: "0.75rem",
            color: theme.palette.text.primary,
            letterSpacing: "0.05em",
            padding: "0.25rem 0.5rem",
            minWidth: "auto",
            borderRadius: theme.shape.borderRadius,
            "&:hover": {
              backgroundColor: theme.palette.custom.navHover,
            },
            "&:focus-visible": {
              outline: `1px dashed ${theme.palette.primary.main}`,
              outlineOffset: "0.125rem",
            },
          }),
        },
      ],
    },
  },
});
