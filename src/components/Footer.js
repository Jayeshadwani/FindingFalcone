import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';


export default function Footer() {
  return (
    <>
      <AppBar position="fixed" color="transparent" component="footer" sx={{ top: 'auto', bottom: 0,backgroundColor:"primary.dark" }} >
          <Toolbar variant='dense'  sx={{display:"flex",justifyContent:"center"}}>
          </Toolbar>
        </AppBar>
    </>
  )
}
