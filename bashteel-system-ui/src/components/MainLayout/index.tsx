import React from 'react'
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

import NavBar from '../NavBar'

type Props = {
  children: React.JSX.Element
}

const MainLayout = ({ children }: Props) => {
  const { i18n } = useTranslation();

  return (
    <>
      <Box width='100vw' height='100vh' dir={i18n.dir()}>
        <NavBar />
        {children}
      </Box>
    </>
  )
}

export default MainLayout