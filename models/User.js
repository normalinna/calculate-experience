const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    nickname: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    people: [{type: Types.ObjectId, ref: 'People'}]
});

module.exports = model('User', schema);
