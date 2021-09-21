const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = 5000;

// Database Connection.
const url = "mongodb://localhost/myProject";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database Connected...");
  })
  .catch((err) => {
    console.log("Connection Failed...");
  });

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use("/auth", require("./app/routes/auth"));
app.use("/user", require("./app/routes/user"));
app.use("/complaints", require("./app/routes/userComplaints"));

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}.`);
});
