import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Puzzles from './Puzzles.jsx';
import MenuAppBar from './MenuAppBar.jsx';

function App() {
  return (
    <div>
      <MenuAppBar />
      <Container className="chessboard" style={{ paddingTop: '80px' }}>
        <Grid container justify="center">
          <Puzzles style={{ alignItems: 'center', margin: 'auto' }} />

        </Grid>

      </Container>
    </div>
  );
}

export default App;
