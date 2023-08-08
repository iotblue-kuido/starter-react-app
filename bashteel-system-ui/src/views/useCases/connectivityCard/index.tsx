import { Suspense, StrictMode, useEffect, useState } from 'react';
import i18n from 'i18next';
import { BrowserRouter } from 'react-router-dom';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import {BasicCard, BasicCardProps} from 'ui-widgets';
import {useStyles} from "./styles";
import {useAlarms} from '../../../actions/cervello/index';

export function Card(){

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {getProjectAlarms} =  useAlarms();

  const [state, setState] =useState<number>(0);


    useEffect(() => {
       getProjectAlarms().then((res)=>{
        console.log("zzzzzzzzzzz" )
        setState(res.result?.length || 0 );
      });

  }, [getProjectAlarms]);

  return(
    <>
    {`sds ---${state}`}
    </>
  )

}


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

    return (
      <>
      <BasicCard
        title = {"testttt"}
        onInitGet ={async ()=> { return await getProjectAlarms().then((res)=> res.result?.length || 2)}}
      />
      {/* <Card/> */}
    </>
    )
}

export default ConnectivityCard
