const moongose = require('mongoose');
const { Schema } = require('mongoose');


const longtoshort = new Schema({
    userID: {
        ref:'user',
        type: moongose.Schema.Types.ObjectId,
        unique: false
    },
    Longurl: {
        type: String,
    },
    Shorturl: {
        type: String,
    },
    clicks: {
        type: Number,
        default: 0
    }

})

// longtoshort.index({ userID: 1, Longurl: 1 });

const Longschema = moongose.model('short', longtoshort);
module.exports = Longschema;