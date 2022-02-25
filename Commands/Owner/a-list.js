const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { OWNERID } = require('../../config.json');


module.exports = {
    name: 'a-list',
    description: 'Arena-List (Owner of the bot only!!)',
    usage: 'e!a-list',
    run: async(client, message, args) => {
        if(message.author.id !== OWNERID) return message.reply("You cannot use this command as it is Owner only!")
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setStyle("SUCCESS")
        .setLabel('Join')
        .setCustomId('join')
    )
    .addComponents(
        new MessageButton()
        .setStyle("DANGER")
        .setLabel('Leave')
        .setCustomId('exit')
    )

    const embeda = new MessageEmbed()
    .setTitle("ARENA-LIST")
    .setDescription("No players!")
    .setFooter({ text: `^List Members^`})
    .setColor("DARK_BUT_NOT_BLACK")

    message.channel.send({ embeds: [embeda], components: [row]});
    }
}