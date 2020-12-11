const dotenv = require('dotenv');

dotenv.config();
const { DATABASE } = process.env;

async function createPuzzle(client, newPuzzle) {
  const result = await client.db(DATABASE).collection('puzzles').insertOne(newPuzzle);
  console.log('new document created');
}

async function connectAndRetrievePuzzle(client, options) {
  let result;
  try {
    await client.connect();
    result = await client.db(DATABASE).collection('puzzles').findOne(options);
  } catch (e) {
    console.log(e);
  }
  return result;
}

async function connectAndInsertPuzzle(client, puzzleInfo) {
  try {
    await client.connect();
    console.log('database connected');
    await createPuzzle(client, puzzleInfo);
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  createPuzzle,
  connectAndRetrievePuzzle,
  connectAndInsertPuzzle,
};
