require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const messagesRouter = require("./routes/messagesRouter");
const drinksRouter = require("./routes/drinksRouter");
const boardGamesRouter = require("./routes/boardGamesRouter");
const usersRouter = require("./routes/usersRouter");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/messages", messagesRouter);
app.use("/api/drinks", drinksRouter);
app.use("/api/boardgames", boardGamesRouter);
app.use("/api/users", usersRouter);

app.listen(port, () => {
  console.log("Server is listening on port " + port + "!");
});
