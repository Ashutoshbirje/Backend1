const mongoose = require("mongoose");

const firSchema = new mongoose.Schema({
  firNumber: String,
  date: String,
  time: String,
  policeStation: String,
  district: String,
  state: String,
  officerName: String,
  receivedMode: String,
  offenseType: String,
  offenseDateTime: String,
  occurrencePlace: String,
  incidentDescription: String,
  complainantName: String,
  guardianName: String,
  age: String,
  gender: String,
  contact: String,
  email: String,
  address: String,
  firDraft: String
}, { timestamps: true });

module.exports = mongoose.model("FirReport", firSchema);
