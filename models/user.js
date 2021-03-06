const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    instruments: [String],
    image: [String],
    numberofgigs: Number,
    gigsHosted: [Schema.Types.ObjectId],
    gigsEmployed: [Schema.Types.ObjectId],
    moneyEarned: { type: Number, default: 0 },
    rating: { type: Schema.Types.Decimal128, default: 5.0 },
    bio: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
