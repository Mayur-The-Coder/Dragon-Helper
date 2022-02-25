const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { OWNERID } = require('../../config.json');

module.exports = {
    name: "buttonrule",
    description: 'Send a button for rule channel',
    usage: 'e!buttonrule',
    run: async(client, message, args) => {
        if(message.author.id !== OWNERID) return message.reply("Owner only command you can\'t use!")
        const embedr = new MessageEmbed()
        .setTitle("Verify!")
        .setDescription("Press the button below \*\*Once\*\* to verify")

        const wor = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel("Verify")
            .setStyle("SUCCESS")
            .setCustomId("verify")
            .setEmoji('✅')
        )
        message.channel.send({ embeds: [embedr], components: [wor]});
    }
}