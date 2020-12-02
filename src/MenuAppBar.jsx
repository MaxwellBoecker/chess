import React from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';

function MenuAppBar() {
  return (
    <div>
      <AppBar>
        <Toolbar style={{ backgroundColor: '#373737' }}>
          <Button style={{ color: 'goldenrod' }}>
            Puzzles
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MenuAppBar;
