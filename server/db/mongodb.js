const mongoose = require("mongoose");
const URI = process.env.MONGO_DB_URI;
console.log(URI);
const options = {
  useNewUrlParser: true,
  useCreateIndex: true
};
mongoose.connect(URI, options);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Mongodb connection error:"));

db.once("open", () => console.log("we're connected"));
