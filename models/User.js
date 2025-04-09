const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: String,
  favorites: {
    games: { type: Array, default: [] },
    players: { type: Array, default: [] },
    teams: { type: Array, default: [] }
  }
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
