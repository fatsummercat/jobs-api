require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: "Please provide name",
    maxlength: [15, "max length for name is 15"],
  },
  email: {
    type: String,
    require: "Please provide email",
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    require: "Please provide password",
    minlength: [6, "minimum length for password is 6"],
  },
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.createToken = function () {
  return jwt.sign(
    {
      userId: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

UserSchema.methods.comparePwd = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
