const Discord = require('discord.js');

module.exports = {
    name: 'miniboss',
    description: 'Miniboss list',
    aliases: ['mb'],
    usage: 'e!miniboss [join, leave, list]',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.author.id !== client.config.OWNERID) return message.reply(`Sorry owner only command!`)
        const button = new Discord.MessageButton()
        .setCustomId('yeet')
        .setLabel("Leave")
        .setStyle("DANGER");
        const row = new Discord.MessageActionRow()
        .addComponents(
            button
        );
        const Embed = new Discord.MessageEmbed()
        .setTitle("MINIBOSS LIST")
        .setThumbnail(message.guild.iconURL({ dynamic: true}))
        .setDescription("New list(not active yet)")
        .addField("Recommended Host", "none")
        .setColor("WHITE");

        message.channel.send({ embeds: [Embed], components: [row]})
    }
}