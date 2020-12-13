const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { client } = require('../database');
const { connectAndRetrievePuzzle, connectAndInsertPuzzle } = require('../database/dbFunctions');

const app = express();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
dotenv.config();

const { port, DATABASE } = process.env;
app.use('/', express.static(path.join(__dirname, '../build')));

app.get('/puzzle', (req, res) => {
  const options = { sequence: { $eq: 2 } };
  connectAndRetrievePuzzle(client, options)
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

app.post('/puzzle', jsonParser, (req, res) => {
  const puzzleInfo = req.body;
  connectAndInsertPuzzle(client, puzzleInfo)
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).send('Could not insert document', err);
    });
});

app.use('*', express.static(path.join(__dirname, '../build/index.html')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
