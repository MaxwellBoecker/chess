import React from 'react';
import {
  Container, Grid, Paper, AppBar,
} from '@material-ui/core';
import Move from './Move.jsx';

const MovesBox = (props) => {
  const { moves } = props;
  return (
    <Container style={{ backgroundColor: '#373737', color: 'white' }}>
      <Paper style={{ backgroundColor: '#373737', color: 'white' }}>
        {moves.map((m, i) => (
          <>
            <span>{i}</span>.{' '}
            <Move move={m} key={i} />
            {' '}
          </>
        ))}
      </Paper>
    </Container>
  );
};

export default MovesBox;
