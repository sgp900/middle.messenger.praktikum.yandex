const express = require("express");

const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.disable('etag');

app.use(express.static(path.join(__dirname, "/dist")));
// app.use(express.static(__dirname + "/img"));

app.get('/', (req, res) => {
  console.log(`we get HTTP GET request width param ${req}`);
})
app.post('/', (req, res) => {
  console.log(`we get HTTP POST request width param ${req}`);
})

app.listen(PORT, () => {
  console.log(`Server is started on port: ${PORT}!`);
});
