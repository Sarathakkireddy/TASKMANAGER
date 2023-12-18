const app = require("./app");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();

const port = process.env.PORT;

connectDB(process.env.MONGO_URI);

app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
  });