import { createTheme } from '@mui/material/styles';

const theme = createTheme ({
    palette: {
      primary: {
        // dark purple
        second:"rgba(29, 11, 76, 0.75)",
        // light purple
        main:"#956BFF",
      },
      secondary: {
        // yellowish
        main:"#F7E731",
      },
      tertiary: {
        // darker purple
        main:"rgb(128,80,250, 0.3)",
      },
    },
    typography: {
      fontFamily: [
        // body font
        'Dosis'
      ],
      h4: {
        fontWeight: 600,
        fontSize: 28,
        lineHeight: '2rem',
      },
      h5: {
        fontWeight: 100,
        lineHeight: '2rem',
      },
    },
})

export default theme;