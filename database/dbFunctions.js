const dotenv = require('dotenv');

dotenv.config();
const { DATABASE } = process.env;

async function createPuzzle(client, newPuzzle) {
  const result = await client.db(DATABASE).collection('puzzles').insertOne(newPuzzle);
  console.log(`new document created`);
}

module.exports = {
  createPuzzle,
};
