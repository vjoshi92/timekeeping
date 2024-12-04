import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: purple[500],
//     },
//     secondary: {
//       main: green[500],
//     },
//   },
// });

export default createTheme({
  // typography: {
  //         // primary: {
  //         //   main: purple[500],
  //         // },
  //         // secondary: {
  //         //   main: green[500],
  //         // },
  //         fontFamily: "Museo Sans"

  //       },
  //       subtitle1: {
  //         fontFamily: "Museo Sans"
  //         },
  palette: {
    primary: {
      main: "#3a5cac",
    },
    secondary: {
      main: red[500],
    },
    text: {
      secondary: "#212121",
    },
  },
  typography: {
    fontFamily: ["Montserrat"].join(","),
    fontWeightLight: 100,
    fontWeightRegular: 300,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },

  components: {
    // Name of the component
    MuiTextField: {
      defaultProps: {
        // The props to change the default for.
        sx: {
          "& label": {
            color: "#757575",
          },
          "& .MuiInputLabel-shrink": {
            color: "#212121",
          },

          //ore ripple, on the whole application 💣!
        },
      },
    },

    MuiButton: {
      defaultProps: {
        // The props to change the default for.
        //color: "error",
        //ore ripple, on the whole application 💣!
      },
    },
  },
});
