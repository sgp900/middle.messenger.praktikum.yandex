const express = require("express");

const path = require("path");

const PORT = process.env.PORT || 3000;

const dist = path.join(__dirname, "/dist");

const app = express();

app.disable("etag");

app.use(express.static(dist));

app.get("/*", (req, res) => {
  res.sendFile(dist + "/index.html");
});

app.listen(PORT, () => {
  console.log(`Server is started on port: ${PORT}!`);
});
