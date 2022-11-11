"use strict";

const express = require("express");
const path = require("path");
const PORT = 3000;

const app = express();

app.use(express.static(__dirname + "/dist"));
app.use(express.static(__dirname + "/img"));

app.listen(PORT, () => {
  console.log(`Server is started on port: ${PORT}!`);
});
