const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return candidatePassword === this.password;
};

module.exports = mongoose.model('User', userSchema);
