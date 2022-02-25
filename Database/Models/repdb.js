const { model, Schema } = require('mongoose');

module.exports = model("Repuation", new Schema({
    guildId: String,
    userId: String,
    Rep: Number
}));