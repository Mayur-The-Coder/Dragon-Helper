const { model, Schema } = require("mongoose");

module.exports = model("Clan", new Schema({
    guildId: String,
    ownerId: String,
    messageId: String,
    channelId: String
}));