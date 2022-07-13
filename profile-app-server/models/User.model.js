const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    password: String,
  },
  {
    campus: {
      type: String,
      cities:["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "México", "Sao Paulo", "Lisbon", "Remote"],
      default:"",
    }
  },
  {
    course: {
      type: String,
      courses:["Web Dev", "UX/UI", "Data Analytics","Cyber Security"],
    }
  },
  {
    image: {
      type: String,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
