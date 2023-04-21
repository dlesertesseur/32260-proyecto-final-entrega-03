import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
  code: { type: String, required: true },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  purchase: { type: String, required: true },
});

export default ticketSchema;