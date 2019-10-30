const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GigSchema = new Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    instruments: [String],
    description: String,
    gigsMates: [Schema.Types.ObjectId],
    author: Schema.Types.ObjectId,
    moneyPaid: { type: Number, default: 0 },
    rating: { type: Schema.Types.Decimal128, default: 5.0 },
});

const Gigs = mongoose.model("Gigs", GigSchema);

module.exports = Gigs;