import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Header() {
    const handleReset = () => {
        window.location.reload();
    }

  return (
    <header>
      <Box sx={{ flexGrow: 1,backgroundColor:"primary.light" }} >
        <AppBar position="static" component="div" color="transparent"  >
          <Toolbar sx={{display:"flex",justifyContent:"flex-end"}}>
            <Button color="inherit" className="text-capitalize" onClick={handleReset}>Reset</Button>
              <Typography color="inherit">  | </Typography>
              <Button target="_blank" href="https://www.geektrust.com/" color="inherit" className="text-capitalize">GeekTrust Home</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
}