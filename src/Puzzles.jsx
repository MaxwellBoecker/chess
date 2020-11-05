import React from 'react';
import Chessboard from 'chessboardjsx';
import HumanVsHuman from './HumanVsHuman.jsx';

function Puzzles() {
  const fen = '3qr3/p1R3pk/3P1b1p/3QBp2/5P2/1P1bp1P1/P5B1/6K1 b - - 0 40';
  const solution = ['Bxe5', 'Qd5xd3', 'e2', 'Rc1', 'Bxd6', 'Qxf5'];
  // const fen = 'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19';
  return (
    <div>
      <HumanVsHuman fen={fen} solution={solution}>
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
            id="humanVsHuman"
            width={320}
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
      </HumanVsHuman>
    </div>
  );
}

export default Puzzles;
