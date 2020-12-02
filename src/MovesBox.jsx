/* eslint-disable react/no-array-index-key */
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
          <span key={i}>
            <span key={i}>{i}</span>
            .
            {' '}
            <Move move={m} key={m} />
            {' '}
          </span>
        ))}
      </Paper>
    </Container>
  );
};

export default MovesBox;
