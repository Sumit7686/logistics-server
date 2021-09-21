const nodeMailer = require("nodemailer");
const app = require("express").Router();
const authorization = require("../middleware/authorization");
const jwtGenerator = require("../utils/jwtGenerator");

// Models.
const User = require("../models/user");
const Order = require("../models/order");

// OTP.
const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "sumitbharodiya76@gmail.com",
    pass: "$umiT7686",
  },
});
var otp = Math.floor(Math.random() * 1000) + 1111;

// Routes.
app.post("/registerUser", (req, res) => {
  let userData = User(req.body);
  const email = userData.email;

  //   OTP.
  var mailOptions = {
    to: userData.email,
    subject: "Otp for registration is: ",
    html:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>",
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("error", error);
    }
    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send("otp");
  });

  User.findOne({ email })
    .then((result) => {
      if (result === null) {
        userData
          .save()
          .then(() => {
            var id = userData.id;
            const token = jwtGenerator(id);

            User.findByIdAndUpdate(id, { otp }, (err, result) => {
              if (result) {
                // console.log("result otp :");
              } else {
                console.log("result otp err:", err.message);
              }
            });

            return res.json({
              isValid: true,
              id: id,
              token: token,
              message: "Please otp is verify.",
            });
          })
          .catch((err) => {
            console.log("user register err :", err);
            return res.json({ isValid: false, message: "Server Error." });
          });
      } else {
        return res.json({
          isValid: false,
          message: "Your Email ID is already Exist.",
        });
      }
    })
    .catch((err) => {
      console.log("boy register error :", err);
      res.json({ isValid: false, message: "Server Error." });
    });
});

app.post("/otp-verify/:id", (req, res) => {
  let inputOtp = req.body;
  let id = req.params.id;
  let OTP = inputOtp.otp;

  User.findById(id, (err, result) => {
    if (result) {
      if (result.otp == OTP) {
        return res.json({ isValid: true, message: "Otp Verify" });
      } else {
        return res.json({ isValid: false, message: "OTP is don't match." });
      }
    } else {
      console.log("otp verify err :", err.message);
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.find({ email, password })
    .select("email password role")
    .then((result) => {
      const id = result[0].id;
      const token = jwtGenerator(id);
      return res.json({
        isValid: true,
        token: token,
        id: result[0].id,
        role: result[0].role,
        message: "Login success User.",
      });
    })
    .catch(() => {
      return res.json({
        isValid: false,
        message: "Email ID & Password is not match.",
      });
    });
});

app.get("/is-verify", authorization, async (req, res) => {
  try {
    return res.json({ message: true });
  } catch (err) {
    console.log("is verify error :", err.message);
    return res.json({ message: "Server Error." });
  }
});

app.post("/order", (req, res) => {
  const { orderId } = req.body;

  Order.find({ order_id: orderId })
    .then((result) => {
      res.json({
        isValid: true,
        message: "Success Track Order Id.",
        data: result,
      });
    })
    .catch((err) => {
      console.log("err order :", err);
      res.json({ isValid: false, message: "Server Error." });
    });
});

app.get("/orderStatus/:id", (req, res) => {
  const id = req.params.id;

  Order.find({ order_id: id })
    .then((result) => {
      res.json({ isValid: true, message: result });
    })
    .catch((err) => {
      console.log("err order status :", err.message);
      res.json({ isValid: false, message: "Server Error." });
    });
});

module.exports = app;
