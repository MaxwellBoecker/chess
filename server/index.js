const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { client } = require('../database');
const { createPuzzle } = require('../database/dbFunctions');

const app = express();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
dotenv.config();

const { port } = process.env;
app.use('/', express.static(path.join(__dirname, '../build')));

app.use('*', express.static(path.join(__dirname, '../build/index.html')));

app.post('/puzzle', jsonParser, (req, res) => {
  const puzzleInfo = req.body;
  async function connectAndInsertPuzzle(client, puzzleInfo) {
    try {
      await client.connect();
      console.log('database connected');
      await createPuzzle(client, puzzleInfo);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
      console.log('closed');
    }
  }
  connectAndInsertPuzzle(client, puzzleInfo)
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).send('Could not insert document', err);
    });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
