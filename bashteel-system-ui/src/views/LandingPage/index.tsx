import { init } from 'kuido-sdk'
import { Options } from 'kuido-sdk/lib/adapters/auth';
import {AccessTimeFilled} from '@mui/icons-material';
import {ConnectivityCard} from "../useCases"
import {KuidoTheme} from 'ui-widgets'

import { useTheme } from '@mui/material/styles';
import { lightTheme } from '../../Theme/lightTheme';

import TestCard from './testCard';

const LandingPage = () => {

  const theme = useTheme();

  console.log("theme 0", theme.spacing(4))


  return (
        <ConnectivityCard />
  )
}

export default LandingPage