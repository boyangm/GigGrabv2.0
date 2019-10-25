const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    instruments: [String],
    image: [String],
    numberofgigs: Number,
    gigsHosted: [Number],
    gigsEmployed: [Number],
    moneyEarned: { type: Number, default: 0 },
    rating: { type: Schema.Types.Decimal128, default: 5.0 },
    bio: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
