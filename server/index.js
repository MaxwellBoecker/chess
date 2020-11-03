const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const { port } = process.env;
app.use("/", express.static(path.join(__dirname, "../build")));

app.use('*', express.static(path.join(__dirname, "../build/index.html")));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});