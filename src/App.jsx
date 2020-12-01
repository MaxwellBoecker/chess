import React from 'react';
import { Container } from '@material-ui/core';
import Puzzles from './Puzzles.jsx';
import MenuAppBar from './MenuAppBar.jsx';

function App() {
  return (
    <div>
      <MenuAppBar />
      <Container class="chessboard" style={{ paddingTop: "64px"}}>
        <Puzzles />

      </Container>
    </div>
  );
}

export default App;
