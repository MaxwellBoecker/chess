import React from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import CreateBoard from './CreateBoard.jsx';
import Profile from './Profile.jsx';

function App() {
  return (
    // <div>
    //   <CreateBoard></CreateBoard>
    // </div>
    <Router>
      <AppBar>
        <Toolbar style={{ backgroundColor: '#373737' }}>
          <Link
            to="/profile"
            style={{ textDecoration: 'none' }}
          >
            <Button style={{ color: 'goldenrod' }}>
              Profile
            </Button>
          </Link>
          <Link
            to="/puzzles"
            style={{ textDecoration: 'none' }}
          >
            <Button style={{ color: 'goldenrod' }}>
              Train
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/puzzles">
          <CreateBoard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
