import React from "react";
import { Box, Typography , useTheme, ThemeProvider} from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useStyles } from "./styles";
// import i18n from 'i18next';
// import EN from '../i18n/en.json';
// import AR from '../i18n/ar.json';

export default function TestCard() {
    // i18n.addResourceBundle('en', 'translations', EN, true, true);
    // i18n.addResourceBundle('ar', 'translations', AR, true, true);
    // const theme = useTheme();
    // console.log('hereeeeeeee', theme.spacing)
    const classes = useStyles();
    // const { t } = useTranslation();

    return (
        <Box className={classes.root} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant={'h6'} color={'text.primary'}>{"title"}</Typography>
        </Box>
    )
}