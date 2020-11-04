import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chess from 'chess.js'; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor

import Chessboard from 'chessboardjsx';

class HumanVsHuman extends Component {
  static propTypes = { children: PropTypes.func };

  state = {
    fen: 'start',
    dropSquareStyle: {},
    squareStyles: {},
    pieceSquare: '',
    square: '',
    history: [],
    orientation: 'black',
  };
  
  componentDidMount() {
    const { fen } = this.props;
    const newFen = fen;
    const findOrientation = (fen) => {
      if (fen.split(' ')[1] === 'b') {
        return 'black';
      }
      return 'white';
    };
    
    const orientation = findOrientation(newFen);
    console.log(orientation);
    this.setState({
      fen,
      orientation,
    });
    this.game = new Chess(fen);
  }


  // keep clicked square style and remove hint squares
  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history }),
    }));
  };

  // show possible moves
  highlightSquare = (sourceSquare, squaresToHighlight) => {
    const { history, pieceSquare } = this.state;
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => ({
        ...a,
        ...{
          [c]: {
            background:
                'radial-gradient(circle, #fffc00 36%, transparent 40%)',
            borderRadius: '50%',
          },
        },
        ...squareStyling({
          history,
          pieceSquare,
        }),
      }),
      {},
    );

    this.setState(({ squareStyles }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles },
    }));
  };

  onDrop = ({ sourceSquare, targetSquare }) => {
    console.log('clicked!');
    const move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move === null) return;
    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      squareStyles: squareStyling({ pieceSquare, history }),
    }));
  };

  onMouseOverSquare = (square) => {
    // get list of possible moves for this square
    const moves = this.game.moves({
      square,
      verbose: true,
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    const squaresToHighlight = [];
    for (let i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);
  };

  onMouseOutSquare = (square) => this.removeHighlightSquare(square);

  // central squares get diff dropSquareStyles
  onDragOverSquare = (square) => {
    this.setState({
      dropSquareStyle:
        square === 'e4' || square === 'd4' || square === 'e5' || square === 'd5'
          ? { backgroundColor: 'cornFlowerBlue' }
          : { boxShadow: 'inset 0 0 1px 4px rgb(255, 255, 0)' },
    });
  };

  onSquareClick = (square) => {
    const { history, pieceSquare } = this.state;

    this.setState(({ history }) => ({
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square,
    }));
    console.log(this.state);
    const move = this.game.move({
      from: pieceSquare,
      to: square,
      promotion: 'q', // always promote to a queen for example simplicity
    });
    console.log(move, 'move');
    console.log(this.game, 'game');
    // illegal move
    if (move === null) return;

    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: '',
    });
    console.log(history);
  };

  onSquareRightClick = (square) => this.setState({
    squareStyles: { [square]: { backgroundColor: 'deepPink' } },
  });

  render() {
    const { fen, dropSquareStyle, squareStyles, orientation } = this.state;
    const { children } = this.props;

    return children({
      orientation,
      squareStyles,
      position: fen,
      onMouseOverSquare: this.onMouseOverSquare,
      onMouseOutSquare: this.onMouseOutSquare,
      onDrop: this.onDrop,
      dropSquareStyle,
      onDragOverSquare: this.onDragOverSquare,
      onSquareClick: this.onSquareClick,
      onSquareRightClick: this.onSquareRightClick,
    });
  }
}

// export default function WithMoveValidation() {
//   return (
//     <div>
//       <HumanVsHuman>
//         {({
//           position,
//           onDrop,
//           onMouseOverSquare,
//           onMouseOutSquare,
//           squareStyles,
//           dropSquareStyle,
//           onDragOverSquare,
//           onSquareClick,
//           onSquareRightClick,
//         }) => (
//           <Chessboard
//             id="humanVsHuman"
//             width={320}
//             position={position}
//             onDrop={onDrop}
//             onMouseOverSquare={onMouseOverSquare}
//             onMouseOutSquare={onMouseOutSquare}
//             boardStyle={{
//               borderRadius: '5px',
//               boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
//             }}
//             squareStyles={squareStyles}
//             dropSquareStyle={dropSquareStyle}
//             onDragOverSquare={onDragOverSquare}
//             onSquareClick={onSquareClick}
//             onSquareRightClick={onSquareRightClick}
//           />
//         )}
//       </HumanVsHuman>
//     </div>
//   );
// }

const squareStyling = ({ pieceSquare, history }) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    [pieceSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: 'rgba(255, 255, 0, 0.4)',
      },
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: 'rgba(255, 255, 0, 0.4)',
      },
    }),
  };
};
export default HumanVsHuman;
