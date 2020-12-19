/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Container,
} from '@material-ui/core';
import Move from './Move.jsx';
import MoveControlPanel from './MoveControlPanel.jsx';
import SuccessFailBar from './SuccessFailBar.jsx';

const MoveDisplayBox = (props) => {
  const { moves, orientation, success, color, incorrectMove } = props;
  const determinePrefix = (index, orientation) => {
    let prefix = '';
    const evaluatedMove = index % 2;
    const numeral = index / 2;
    if (orientation === 'black') {
      if (index === 0) {
        prefix = '1.';
      } else if (evaluatedMove === 0) {
        prefix = `${numeral + 1}.`;
      }
    } else {
      if (index === 0) {
        prefix = '0...';
      } else if (evaluatedMove === 1) {
        prefix = `${Math.floor(numeral) + 1}.`;
      }
    }
    return prefix;
  };
  return (
    <div>
      {success !== null ? <SuccessFailBar color={color} incorrectMove={incorrectMove} /> : ''}
      <Container style={{ backgroundColor: '#373737', color: 'white', paddingBottom: '128px', paddingTop: '12px' }}>
        {moves.map((m, i) => {
          const prefix = determinePrefix(i, orientation);
          return (
            <span key={i}>
              <span key={i}>{prefix}</span>
              {' '}
              <Move move={m} key={m} />
              {' '}
            </span>
          );
        })}
      </Container>
      <MoveControlPanel />
    </div>
  );
};

export default MoveDisplayBox;
