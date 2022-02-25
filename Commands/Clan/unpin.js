const { Client, Message, MessageEmbed } = require('discord.js');
const channelData = require('../../Database/Models/clandb');

module.exports = {
    name: 'unpin',
    description: 'Unpin a message in your clan!',
    usage: 'e!unpin [message-id]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const clanA = channelData.findOne({ guildId: message.guild.id, ownerId: message.author.id ,channelId: message.channel.id});
        if(!clanA) return message.reply(`Sorry I couldn't find your clan!\nEither you do not own one or the channel you are using it not your clan!\nOr you aren't the owner of this clan!`);
        // if(message.author.id !== clanA.ownerId) return message.reply(`Sorry this is owner only command!`);
        // const msg = message.channel.messages.cache.get(args[0]);
        const msg = await message.channel.messages.fetch(args[0], { force: true, cache: true})
        if(!msg) return message.reply(`Sorry I couldn't find your provided message ID.\nIf you don't know how to get it\n1. Please go to your settings ->\n2. Advanced mode ->\n3. Enable developer mode!\nOr the message isn't pinnned!`);
        if(!msg.pinned) return message.reply(`Provided message is not pinned!`);
        if(msg.author.id == client.user.id) return message.reply(`Cannot unpin messages sent by me they are important and must be pinned!`)
        msg.unpin();
        message.react("👍")
    }
}