import React, { useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Container, Grid } from '@material-ui/core';
import PuzzleLogic from './PuzzleLogic.jsx';
import MoveDisplayBox from './MoveDisplayBox.jsx';
import Stopwatch from './Stopwatch.jsx';
import { findOrientation } from './puzzleFunctions';

function PuzzleFeature() {
  const fen = '3qr3/p1R3pk/3P1b1p/3QBp2/5P2/1P1bp1P1/P5B1/6K1 b - - 0 40';
  const solution = ['Bxe5', 'Qd5xd3', 'e2', 'Rc7tc1', 'Bxd6', 'Qd3xf5+', 'Kh8'];
  const [moves, setMoves] = useState(['Qd5']);
  const [orientation, setOrientation] = useState('white');
  const [success, setSuccess] = useState(null);
  const [color, setColor] = useState(null);
  const [stopClock, setStopClock] = useState(false);
  useEffect(() => {
    setOrientation(findOrientation(fen));

  });
  const updateFenOnClick = () => {

  };
  // const fen = 'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19';
  // set initial `ghost move` from computer
  return (
    <Container className="chessboard" style={{ paddingTop: '80px' }}>
      <Grid container justify="center" spacing={8}>
        <Grid item md>
          <Stopwatch stopClock={stopClock}></Stopwatch>
        </Grid>
        <Grid item md>
          <PuzzleLogic
            fen={fen}
            solution={solution}
            setMoves={setMoves}
            moves={moves}
            success={success}
            setSuccess={setSuccess}
            setColor={setColor}
            setStopClock={setStopClock}
          >
            {({
              orientation,
              position,
              onDrop,
              onMouseOverSquare,
              onMouseOutSquare,
              squareStyles,
              dropSquareStyle,
              onDragOverSquare,
              onSquareClick,
              onSquareRightClick,
            }) => (
              <Chessboard
                id="PuzzleLogic"
                width={600}
                position={position}
                onDrop={onDrop}
                onMouseOverSquare={onMouseOverSquare}
                onMouseOutSquare={onMouseOutSquare}
                boardStyle={{
                  borderRadius: '5px',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
                }}
                squareStyles={squareStyles}
                dropSquareStyle={dropSquareStyle}
                onDragOverSquare={onDragOverSquare}
                onSquareClick={onSquareClick}
                onSquareRightClick={onSquareRightClick}
                orientation={orientation}
              />
            )}
          </PuzzleLogic>

        </Grid>
        <Grid item md>
          <MoveDisplayBox moves={moves} orientation={orientation} success={success} color={color}/>
        </Grid>
      </Grid>

    </Container>
  );
}

export default PuzzleFeature;
