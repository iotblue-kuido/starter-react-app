import { Suspense, StrictMode, useEffect } from 'react';
import i18n from 'i18next';
import { BrowserRouter } from 'react-router-dom';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import {BasicCard, BasicCardProps} from 'ui-widgets';
import {useStyles} from "./styles";
import {useAlarms} from '../../../actions/cervello/index';

function ConnectivityCard() {
    const classes:any = useStyles();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const {getProjectAlarms} =  useAlarms();
    
  // useEffect(() => {
  //   async function getBuildingData() {
  //     const assets = await getProjectAlarms();
  //       console.log("assets", assets.result)
  //   }
  //   getBuildingData();
  //   console.log("assets 0")

  // }, [getProjectAlarms]);


    const configs : BasicCardProps = {
        title:"title test",
        onInitGet: async ()=> { return  await getProjectAlarms().then((res)=> res.result?.length)}
    } 
    return (
      <BasicCard
        {...configs}
      />
    )
}

export default ConnectivityCard
