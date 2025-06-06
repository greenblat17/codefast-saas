import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  hasAccess: {
    type: Boolean,
    default: false,
  },
  customerId: {
    type: String,
  },
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
