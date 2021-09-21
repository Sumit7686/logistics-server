const app = require("express").Router();

// Models.
const User = require("../models/user");
const Order = require("../models/order");

app.get("/userPersonalData/:id", (req, res) => {
  const id = req.params.id;

  User.findById(id, (err, result) => {
    if (result) {
      res.json({ isValid: true, message: result });
    } else {
      res.json({ isValid: false, message: "Server Error." });
    }
  });
});

app.get("/userPersoalOrder/:id", (req, res) => {
  const id = req.params.id;

  Order.find({ user_id: id })
    .then((result) => {
      res.json({ isValid: true, message: result });
    })
    .catch((err) => {
      console.log("err user personal order :", err.message);
      res.json({ isValid: false, message: "Server Error." });
    });
});

module.exports = app;
