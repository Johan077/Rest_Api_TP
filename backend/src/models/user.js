const { Schema, model} = require('mongoose');

const userShema = new Schema({
    email: String,
    password: String
},{
    timestamps: true
});

module.exports = model('User', userShema);