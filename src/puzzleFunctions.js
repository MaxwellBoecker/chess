/* eslint-disable no-unused-expressions */
const findOrientation = (fen) => {
  if (fen.split(' ')[1] === 'b') {
    return 'black';
  }
  return 'white';
};

const splitSolution = (solution) => {
  const first = solution[0].slice(1, 3);
  const second = solution[0].slice(4, 6);
  let solutionMove;
  const piece = solution[0][0];
  if (solution[0][solution[0].length - 1] === '+') {
    solutionMove = `${second}+`;
  } else {
    solutionMove = `${second}`;
  }
  let newSolution;
  solution[0].includes('x')
    ? newSolution = [`${piece}x${solutionMove}`, ...solution.slice(1)]
    : newSolution = [`${piece}${solutionMove}`, ...solution.slice(1)];
  return { first, second, newSolution };
};

export {
  findOrientation,
  splitSolution,
};
