const Discord = require('discord.js');
// https://sourceb.in/PG4y4Yq8A4
module.exports = {
    name: 'playerreport',
    aliases: ['preport'],
    description: 'Use this command for reporting a player!',
    usage: 'e!preport [id of the player] [your report]',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.channel.id != '942351540042215484') return message.reply(`You cannot report a player in this channel!\nHead to <#942351540042215484>`);
        const reported = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(' ');
        if(!reported) return message.delete() && message.author.send(`You didn't mention a player to report!`).catch((e) => {});
        if(!reason) return message.delete() && message.author.send(`You didn't mention a reason to report!`).catch((e) => {});
        if(reported.user.bot) return message.delete() && message.author.send(`You didn't mention a reason to report!`).catch((e) => {});
        message.delete();
        message.author.send(`Your report has been sent for reviewing!`).catch((e) => {});
        const playerEmbed = new Discord.MessageEmbed()
        .setTitle(`${reported.user.tag} has been reported!`)
        .setDescription(`Reason is as below:-\n${reason}`)
        .setThumbnail(reported.user.avatarURL({ dynamic: true}))
        .setColor("RED");


        const logchannel = client.channels.cache.get("942778308662288384");
        logchannel.send({ embeds: [playerEmbed]})
    }   
}