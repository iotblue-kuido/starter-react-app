import { Suspense, StrictMode } from 'react';
import i18n from 'i18next';
import { BrowserRouter } from 'react-router-dom';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import {ThemeProvider, useTheme} from "@mui/material";
import {BasicCard, BasicCardProps} from 'ui-widgets'
import {useStyles} from "./styles";

function ConnectivityCard() {
    const classes:any = useStyles();

    const configs : BasicCardProps = {
        title:"title test",
        onInitGet: ()=> { return new Promise(()=> 2)}
    } 
    return (
      <BasicCard
        {...configs}
      />
    )
}

export default ConnectivityCard
