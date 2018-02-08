const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const User = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userImg: {
    type: String,
    default:
      "https://i.pinimg.com/564x/c4/87/b4/c487b4871fe87c3114be4585619ce1bc.jpg"
  },
  role: { type: String, default: "user" }
});

User.virtual("isAdmin").get(function() {
  return this.role === "admin";
});

User.pre("save", function(next) {
  if (!this.isModified("password")) return next();

  bcrypt
    .hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(next);
});

User.post("save", function(error, user, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Имя пользователя или адрес электронной почты заняты."));
  } else {
    next(error);
  }
});

User.methods.isCorrectPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', User);