const mongoose = require('mongoose');

// Token schema
const tokenSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  marketCap: Number,
  websites: Array,
  socials: Array,
  tokenAddress: String,
  boostAmount: Number,
  firstFetchedAt: Date,
  __v: Number,
});

module.exports = mongoose.model('Token', tokenSchema);
