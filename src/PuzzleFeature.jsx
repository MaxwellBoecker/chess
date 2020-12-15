import React, { useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Button, Container, Grid } from '@material-ui/core';
import PuzzleLogic from './PuzzleLogic.jsx';
import MoveDisplayBox from './MoveDisplayBox.jsx';
import Stopwatch from './Stopwatch.jsx';
import { findOrientation } from './puzzleFunctions.js';

function PuzzleFeature(props) {
  const { sequence, updateSequence } = props;
  const [fen, setFen] = useState(props.fen);
  const [solution, setSolution] = useState(props.solution);
  
  const [moves, setMoves] = useState([]);
  const [orientation, setOrientation] = useState('white');
  const [success, setSuccess] = useState(null);
  const [color, setColor] = useState(null);
  const [stopClock, setStopClock] = useState(false);

  useEffect(() => {
    setOrientation(findOrientation(fen));
    setFen(props.fen);
    setSolution(props.solution);
    // onsole.log(props.preMove, 'premove');
  }, []);

  const onClickPrev = () => {
    let next = sequence - 1;
    if (next < 1) next = 2;
    updateSequence(next);
  };
  const onClickNext = () => {
    let next = sequence + 1;
    if (next > 2) next = 1;
    updateSequence(next);
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
