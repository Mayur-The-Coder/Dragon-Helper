const { Client, Message, MessageEmbed } = require('discord.js');
const channelData = require('../../Database/Models/clandb');

module.exports = {
    name: 'pin',
    description: 'Pin a message in your clan!',
    usage: 'e!pin [message-id]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const clanA = channelData.findOne({ guildId: message.guild.id, ownerId: message.author.id, channelId: message.channel.id});
        if(!clanA) return message.reply(`Sorry I couldn't find your clan!\nEither you do not own one or the channel you are using it not your clan!\nOr you aren't the owner of this clan!`);
        const id = await message.channel.messages.fetch(args[0], { force: true, cache: true})
        if(!id) return message.reply(`Sorry I couldn't find your provided message ID.\nIf you don't know how to get it\n1. Please go to your settings ->\n2. Advanced mode ->\n3. Enable developer mode! `);
        if(!id.pinnable) return message.reply(`Provided message isn't pinnable!`);
        id.pin();
    }
}