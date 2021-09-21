const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    order_user_area: { type: String, required: true },
    order_user_city: { type: String, required: true },
    order_user_pincode: { type: Number, required: true },
    order_user_contact: { type: String, required: true },
    order_status: { type: String, required: true, default: "Confirmed" },
    order_id: { type: String, required: true },
    awb_number: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
