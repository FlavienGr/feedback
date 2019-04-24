const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleId: String
});

// UserSchema.statics.findOrCreate = async googleId => {
//   let user = await User.findOne({ googleId });
//   if (!user) {
//     user =
//     await user.save();
//   }

//   return user;
// };
const User = mongoose.model("User", UserSchema);
module.exports = User;
