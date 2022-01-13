const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    totalMoney: {
        type: Number,
        default: 100
    }

});


module.exports = mongoose.model('Users', UserSchema);