const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  phone: String,
  address: String,
  password: {
    type: String,
    trim: true,
    required: true,
    select: false
  },
  type: {
    type: String,
    trim: true,
    default: "standard"
  },
});

UserSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

const User = mongoose.model('user', UserSchema);

module.exports = User;