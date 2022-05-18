const mongoose = require('mongoose');


const personalitySchema = new mongoose.Schema ({
    category: Number,
    index: Number,
    review: String
});

// const personality2Schema = new mongoose.Schema ({
//     category: Number,
//     index: Number,
//     review: String
// });
//
// const personality3Schema = new mongoose.Schema ({
//     category: Number,
//     index: Number,
//     review: String
// });

// const Personality = mongoose.model("Personality", personalitySchema);

module.exports = mongoose.model('personality', personalitySchema, 'Personality');
// module.exports = mongoose.model('personality2', personalitySchema, 'Personality2');
// module.exports = mongoose.model('personality3', personalitySchema, 'Personality3');

