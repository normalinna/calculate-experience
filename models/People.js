const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true, unique: true},
    experience: {type: String, required: true},
    owner: [{type: Types.ObjectId, ref: 'User'}],
    date: {type: Date, default: Date.now}
});

module.exports = model('People', schema);
