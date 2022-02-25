const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'credits',
    description: 'Credit for people to make this bot',
    usage: 'e!credits',
    run: async(client, message, args) => {
        const creditembed = new MessageEmbed()
        .setTitle('CREDITS')
        .addFields(
            {
                name: 'Command and Event Handler',
                value: `By FlameQuard\n[YT](https://www.youtube.com/c/FlameQuard)\n[GITHUB](https://github.com/FlameQuard)`
            },
            {
                name: 'Arena/Miniboss list',
                value: `Helped by Diasum#0001\n[Kingdom-Of-Orgins](https://top.gg/bot/797307180024987662)`,
            }
        )
        .setColor("RANDOM")
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.avatarURL({ dynamic: true})});

        message.reply({embeds: [creditembed]});
    }
}