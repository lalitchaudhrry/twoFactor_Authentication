import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,

  isTwoFactorEnabled: {
    type: Boolean,
    default: false
  },

  twoFactorSecret: {
    type: String
  }
});

export default mongoose.model("User", userSchema);
