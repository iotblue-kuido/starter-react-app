import { createTheme } from '@mui/material/styles';
// import { bgBG as pickersBgBG, } from '@mui/x-date-pickers/locales';
import { bgBG as coreBgBG } from '@mui/material/locale';
import { blueGrey as primary, orange as secondary } from '@mui/material/colors';

export const lightTheme = createTheme({
    spacing: 0,
    palette: {
        primary: {
            main: '#1034a6',
            light: 'rgba(52, 124, 255, 0.24)'
        },
        secondary: {
            main: '#eaeaea',
        },
        background: {
            default: '#f3f5fb',
            paper: '#fff'
        }
    },
    typography: {
        "fontFamily": "Cairo",
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500,
        h1: {
            fontSize: '6rem',
            // fontFamily: 'poppinsLight',
            letterSpacing: '-1.5px',
            '&.capitalize': {
                textTransform: 'capitalize',
            },
        },
        h2: {
            fontSize: '3.75rem',
            // fontFamily: 'poppinsLight',
            letterSpacing: '-1px',
            '&.capitalize': {
                textTransform: 'capitalize',
            },
        },
        h3: {
            fontSize: '3rem',
            // fontFamily: 'poppins',
            letterSpacing: '0.7px',
            '&.capitalize': {
                textTransform: 'capitalize',
            },
        },
        h4: {
            fontSize: '2.125rem',
            // fontFamily: 'poppinsBold',
            letterSpacing: '0.6px',
            '&.capitalize': {
                textTransform: 'capitalize',
            },
        },
        h5: {
            fontSize: '1.812rem',
            // fontFamily: 'Poppins',
            letterSpacing: '0.1px',
            '&.capitalize': {
                textTransform: 'capitalize',
            },
        },
        h6: {
            fontSize: '1.5rem',
            // fontFamily: 'Poppins',
            letterSpacing: '0.2px',
            '&.capitalize': {
                textTransform: 'capitalize',
            },
        },
        subtitle1: {
            fontSize: '1.3125rem',
            fontWeight: 700,
            //lineHeight: '31.5px',
            letterSpacing: 0.5,
        },
        subtitle2: {
            fontSize: '1.125rem',
            //lineHeight: '27px',
            letterSpacing: 0.6,
            fontWeight: 500,
        },
        body1: {
            letterSpacing: 0.5,
            fontSize: '1rem',
            //lineHeight: '31.5px',
        },
        body2: {
            fontSize: '.875rem',
            //lineHeight: '24px',
            letterSpacing: 0.5,
        },
        button: {
            fontSize: '.9375rem',
            letterSpacing: 0.8,
            //lineHeight: '24px',
            fontWeight: 500,
            textTransform: 'uppercase',
        },
        caption: {
            fontSize: '.8125rem',
            //lineHeight: '26px',
            letterSpacing: 0.4,
        },
        overline: {
            fontSize: '.625rem',
            letterSpacing: 1,
            //lineHeight: '22px',
            textTransform: 'uppercase',
        },
    },
    // components:{
    //     MuiCssBaseline:{
    //         styleOverrides: `
    //             body:${[poppins, poppinsLight, poppinsMedium, poppinsBold]},
    //         `
    //     }
    // }
});