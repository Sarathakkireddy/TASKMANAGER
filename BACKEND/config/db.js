const mongoose = require("mongoose");

const connectDB = async (URI) => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to remote DB...");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
