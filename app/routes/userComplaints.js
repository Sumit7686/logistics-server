const app = require("express").Router();

// model.
const UserComplaints = require("../models/userComplaints");

app.post("/userComplaints/:id", (req, res) => {
  const id = req.params.id;
  const userComplaints = UserComplaints(req.body);

  UserComplaints.insertMany(
    {
      user_id: id,
      subject: userComplaints.subject,
      description: userComplaints.description,
    },
    (err, result) => {
      if (result) {
        res.json({ isValid: true, message: "User Complaints Done." });
      } else {
        console.log("User Complaints err :", err);
        res.json({ isValid: false, message: "Server Error." });
      }
    }
  );
});

app.get("/userPersonalComplaints/:id", (req, res) => {
  const id = req.params.id;

  UserComplaints.find({ user_id: id })
    .then((result) => {
      res.json({ isValid: true, message: result });
    })
    .catch((err) => {
      console.log("err user personal complaints :", err.message);
      res.json({ isValid: false, message: "Server Error." });
    });
});

module.exports = app;
