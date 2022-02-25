const ms = require("ms");
const Discord = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'Mute a person',
    usage: 'e!mute [user] [time] [reason]',
    /**
     * @param {Discord.Message} message
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first()
        const time = args[1];
        if(!time) return message.reply("Provide a time for mute!");
        const reason = args.slice(2).join(' ');
        if(!reason) return message.reply("Provide a reason to mute!")
        if(!member) return message.reply("Provide a user to mute.");

        if(member.id === client.user.id) return message.reply('[ERROR]: Cannot timeout myself.');
        if(member.id === message.author.id) return message.reply('[ERROR]: You cannot timeout yourself.')

        const timeou = ms(time)
        if(!timeou) return message.reply(`[ERROR]: Couldn't timeout ${member.tag}.\nReason: Invalid time: ${time}`)

        member.timeout(timeou, reason);
        

        message.reply(`Timeout for ${member} for ${time}\nReason: ${reason}`)
    }
}