/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chess from 'chess.js'; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import { findOrientation, splitSolution } from './puzzleFunctions.js';

class PuzzleLogic extends Component {
  // static propTypes = { children: PropTypes.func };

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
    const { fen, solution } = this.props;
    const newFen = fen;

    const orientation = findOrientation(newFen);
    this.setState({
      fen,
      orientation,
      solution,
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
    // console.log('clicked!');
    const move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move === null) return;
    // console.log(move);
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
    // console.log('square', square);
    const { pieceSquare, solution } = this.state;
    const {
      setMoves, moves, setSuccess, setColor, success, setStopClock, fen, setIncorrectMove,
    } = this.props;
    this.setState(({ history }) => ({
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square,
    }));

    const move = this.game.move({
      from: pieceSquare,
      to: square,
      promotion: 'q', // always promote to a queen for example simplicity
    });
    // check if move is valid
    if (move === null) {
    } else if (solution[0] === move.san) {
      setMoves([...moves, move.san]);
      if (solution.length === 1) {
        setSuccess(true);
        setColor('green');
        setStopClock(true);
      }
      this.setState({
        fen: this.game.fen(),
        history: this.game.history({ verbose: true }),
        pieceSquare: '',
        solution: solution.slice(1),
      }, () => {
        const { solution } = this.state;
        if (solution[0] && solution[0].length > 4) {
          const { first, second, newSolution } = splitSolution(solution);
          this.setState({
            solution: newSolution,
          }, () => {
            this.onSquareClick(first);
            this.setState({}, () => {
              this.onSquareClick(second);
            });
          });
        }
      });
    } else {
      if (success === null) {
        setSuccess(false);
        setColor('red');
        setStopClock(true);
        setIncorrectMove(move.san);
        setMoves([...moves, solution]);
      }
    }
  };

  onSquareRightClick = (square) => this.setState({
    squareStyles: { [square]: { backgroundColor: 'deepPink' } },
  });

  render() {
    const {
      fen, dropSquareStyle, squareStyles, orientation,
    } = this.state;
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

PuzzleLogic.propTypes = {
  fen: PropTypes.string.isRequired,
  solution: PropTypes.array.isRequired,
  children: PropTypes.func.isRequired,
};

export default PuzzleLogic;
