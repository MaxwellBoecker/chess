import React, { useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Button, Container, Grid } from '@material-ui/core';
import axios from 'axios';
import PuzzleLogic from './PuzzleLogic.jsx';
import MoveDisplayBox from './MoveDisplayBox.jsx';
import Stopwatch from './Stopwatch.jsx';
import { findOrientation } from './puzzleFunctions.js';

function PuzzleFeature(props) {
  // const fen = '3qr3/p1R3pk/3P1b1p/3QBp2/5P2/1P1bp1P1/P5B1/6K1 b - - 0 40';
  // const solution = ['Bxe5', 'Qd5xd3', 'e2', 'Rc7tc1', 'Bxd6', 'Qd3xf5+', 'Kh8'];
  // let fen = 'rn1qk2r/ppp2ppp/5n2/2b5/2B1P1b1/3P1N2/PPP3PP/RNBQK2R w - - 0 1';
  // let solution = ['Bxf7+', 'Ke8xf7', 'Ne5+', 'Kf7tg8', 'Nxg4'];
  const { sequence, updateSequence } = props;
  const [fen, setFen] = useState(props.fen);
  const [solution, setSolution] = useState(props.solution);
  // let fen = props.fen
  // let solution = props.solution
  const [moves, setMoves] = useState([props.preMove]);
  const [orientation, setOrientation] = useState('white');
  const [success, setSuccess] = useState(null);
  const [color, setColor] = useState(null);
  const [stopClock, setStopClock] = useState(false);

  useEffect(() => {
    setOrientation(findOrientation(fen));
    setFen(props.fen);
    setSolution(props.solution);
    console.log(props.preMove, 'premove')
  }, []);

  const onClickPrev = () => {
    console.log('send to previous puzzle');
    let next = sequence - 1;
    console.log(next);
    updateSequence(next);
  };
  const onClickNext = () => {
    console.log('send to next puzzles', sequence);

    updateSequence(sequence + 1);
  };
  const updateFenOnClick = () => {

  };
  // const fen = 'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19';
  // set initial `ghost move` from computer
  return (
    <Container className="chessboard" style={{ paddingTop: '80px' }}>
      <Grid container justify="center" spacing={8}>
        <Grid item md>
          <Stopwatch stopClock={stopClock} />
        </Grid>
        <Grid item md>
          <PuzzleLogic
            key={fen}
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
                key={fen}
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
          <Container style={{ paddingTop: '12px' }}>
            <Grid container spacing={8}>
              <Grid item md>
                <Button variant="contained" onClick={onClickPrev}>Previous</Button>

              </Grid>
              <Grid item md>
                <Button variant="contained" onClick={onClickNext}>Next</Button>

              </Grid>
            </Grid>

          </Container>
        </Grid>
        <Grid item md>
          <MoveDisplayBox moves={moves} orientation={orientation} success={success} color={color} />
        </Grid>
      </Grid>

    </Container>
  );
}

export default PuzzleFeature;
