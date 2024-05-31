import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.methods.matchPassword = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};
const User = mongoose.User || mongoose.model("User", UserSchema);
export default User;
