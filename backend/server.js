require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;

const messagesRouter = require("./routes/messagesRouter");
const drinksRouter = require("./routes/drinksRouter");
const boardGamesRouter = require("./routes/boardGamesRouter");
const usersRouter = require("./routes/usersRouter");
const adminRouter = require("./routes/adminRouter");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/messages", messagesRouter);
app.use("/api/drinks", drinksRouter);
app.use("/api/boardgames", boardGamesRouter);
app.use("/api/users", usersRouter);
app.use("/api/admin", adminRouter);

app.listen(port, () => {
  console.log("Server is listening on port " + port + "!");
});
