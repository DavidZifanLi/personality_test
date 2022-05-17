const mongoose = require('mongoose');


const personalitySchema = new mongoose.Schema ({
    index: Number,
    review: String
});

const Personality = mongoose.model("Personality", personalitySchema);

module.exports = mongoose.model('personality', personalitySchema, 'Personality');
