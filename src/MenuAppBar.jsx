import React from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

function MenuAppBar() {
  return (
    <div>
      <Router>

        <AppBar>
          <Toolbar style={{ backgroundColor: '#373737' }}>
            <Button style={{ color: 'goldenrod' }}>
              Puzzles
            </Button>
          </Toolbar>
        </AppBar>
      </Router>
    </div>
  );
}

export default MenuAppBar;
