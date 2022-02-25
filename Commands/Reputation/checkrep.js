const { Client, Message, MessageEmbed } = require('discord.js');
const repB = require("../../Database/Models/repdb");

module.exports = {
    name: 'checkrep',
    description: 'Check your reputation!',
    usage: 'e!checkrep [@member(optional)]',
    aliases: ['crep'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let user = message.mentions.users.first();
        if(!user) user = message.author
        if(user.bot) return message.reply(`This user is a bot cannot find his rep!`);
        const repA = await repB.findOne({ guildId: message.guild.id, userId: user.id});
        if(!repA) { message.reply(`This user has not yet started earning!`) } else {
            const Embed = new MessageEmbed()
            .setTitle(`${user.username}'s Reputation Points`)
            .setDescription(`Current Rep: **${repA.Rep}**`)
            .setThumbnail(user.avatarURL({ dynamic: true}))
            .setColor("RANDOM")
            message.channel.send({ embeds: [Embed]})
        }

    }
}