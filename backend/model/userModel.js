const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Already exists"],
    validate: [validator.isEmail, "Please Enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Must be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: { type: String, required: true },
    url: { required: true, type: String },
  },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});

//JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//reset password
userSchema.methods.getResetPasswordToken = function () {
  //Generete Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hashing and adding to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
