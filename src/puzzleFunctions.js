const findOrientation = (fen) => {
  if (fen.split(' ')[1] === 'b') {
    return 'black';
  }
  return 'white';
};

module.exports = {
  findOrientation,
};
