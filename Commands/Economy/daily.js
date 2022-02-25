let { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'daily',
    description: 'Daily earning',
    usage: 'e!daily',
    run: async(client, message, args, cs) => {
        let result = await cs.daily({
            user: message.author,
            guild: message.guild,
            amount: 5000,
    
        });
        let dailyembed = new MessageEmbed()
        .setColor("RANDOM")
        .addFields(
            {
                name: 'Daily reward',
                value: `${result.amount}`
            }
        )
        .setTitle(`${message.author.tag}\'s daily reward!`)
        if (result.error) return message.reply(`You have used daily recently Try again in ${result.time}`);
        else message.channel.send({ embeds: [dailyembed]});
    }
}