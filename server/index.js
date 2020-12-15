const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { createNewClient } = require('../database');
const { connectAndRetrievePuzzle, connectAndInsertPuzzle } = require('../database/dbFunctions');

const app = express();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
dotenv.config();

const { port, DATABASE } = process.env;
app.use('/', express.static(path.join(__dirname, '../build')));
app.use(jsonParser);

app.get('/puzzle', (req, res) => {
  let { sequence } = req.query;
  console.log(sequence);
  sequence = parseFloat(sequence);
  // if(sequence > 2) sequence = 1;
  // if(sequence < 1) sequence = 1;
  const options = { sequence: { $eq: sequence } };
  const client = createNewClient();
  connectAndRetrievePuzzle(client, options)
    .then((data) => {
      console.log(data, 'data server');
      res.status(200).send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

app.post('/puzzle', jsonParser, (req, res) => {
  const puzzleInfo = req.body;
  const client = createNewClient();
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
