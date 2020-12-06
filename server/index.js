const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { connectToDB } = require('../database')
const app = express();
dotenv.config();

connectToDB();
const { port } = process.env;
app.use('/', express.static(path.join(__dirname, "../build")));

app.use('*', express.static(path.join(__dirname, "../build/index.html")));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
