const mongoose = require("mongoose");
const mongoURI = process.env.DB_URI;
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to database successfully");
  });
};
module.exports = connectToMongo;
