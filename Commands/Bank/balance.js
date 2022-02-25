const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'balance',
    description: 'Check your balance',
    usage: 'e!balance',
    aliases: ['bal'],
    run: async(client, message, args, cs) => {
        let user = message.author;
        if (message.mentions.members.first()) {
            user = message.mentions.members.first();
        } else if (args[0]) {
            user = await message.guild.members.fetch(args[0]);
            if (user) user = user.user;
        }
        let result = await cs.balance({
            user: user,
            guild: message.guild
        });
        let balembed = new MessageEmbed()
        .setTitle(`${user.tag}\'s balance`)
        .addFields(
            {
                name: 'Wallet',
                value: `You have $${(result.wallet).toLocaleString()}`
            },
            {
                name: 'Bank',
                value: `You have $${(result.bank).toLocaleString()}`
            }
        )
        .setColor("RANDOM")

        message.reply({ embeds: [balembed]})
    }
}