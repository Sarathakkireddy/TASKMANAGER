const express = require("express");
const cors = require("cors");
const app = express();
const accountRouter = require("./routes/accountRouter");
const cardRouter=require("./routes/cardRouter");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/taskmanager", accountRouter);
app.use("/taskcard",cardRouter)

module.exports = app;
