// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"]
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
//     },
//     password: {
//       type: String,
//       required: [true,"Password is required"],
//       minlength: [6, "Password must be at least 6 characters"],
//     },
//     role: {
//         type: String,
//         enum: ["Admin", "Customer"],
//         default: "Customer"
//     }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true,"Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["SuperAdmin", "SubAdmin", "Customer"],
      default: "Customer"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

