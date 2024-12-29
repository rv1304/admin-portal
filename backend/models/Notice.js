const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  attachment: { type: String }, // Optional file attachment path
});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
