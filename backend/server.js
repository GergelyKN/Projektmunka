require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

app.use(cors());

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello World!!" });
});

app.listen(port, () => {
  console.log("Server is listening on port " + port + "!");
});
