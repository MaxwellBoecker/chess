import React, { useState, useEffect } from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile.jsx';
import Home from './Home.jsx';
import PuzzleFeature from './PuzzleFeature.jsx';

function App() {
  const [fen, setFen] = useState('');
  const [solution, setSolution] = useState([]);
  // const [preMove, setPreMove] = useState('');
  const [sequence, setSequence] = useState(1);
  // const [refresh, setRefresh] = useState(false);
  const updateSequence = (next) => {
    setSequence(next);
  };
  useEffect(async () => {
    const data = await axios.get('/puzzle', { params: { sequence } });
    console.log(data);
    setFen(data.data.fen);
    setSolution(data.data.solution);
    // setPreMove(data.data.pre_move);
  }, [sequence]);
  return (
    // <div>
    //   <CreateBoard></CreateBoard>
    // </div>
    <div key={sequence}>

    <Router>
      <AppBar>
        <Toolbar style={{ backgroundColor: '#373737' }}>
          <Link
            to="/"
            style={{ textDecoration: 'none' }}
          >
            <Button style={{ color: 'goldenrod' }}>
              Home
            </Button>
          </Link>
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
              Tactics
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/puzzles">
          <PuzzleFeature key={solution} fen={fen} solution={solution} sequence={sequence} updateSequence={updateSequence} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
